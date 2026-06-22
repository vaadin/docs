/**
 * Generates a manifest of documentation pages changed in the current branch
 * compared to a base ref (default: origin/main).
 *
 * Outputs:
 * - dspublisher/changes/changes.json: consumed by dspublisher/theme/preview-diff.ts
 *   in preview deployments to highlight changed content on the live site.
 * - preview-comment.md: the sticky PR comment body with links to changed pages.
 *
 * Environment variables:
 * - PREVIEW_BASE_REF: base ref to diff against (default: origin/main)
 * - PREVIEW_URL: base URL of the preview deployment (used in the PR comment)
 * - GITHUB_SHA: commit SHA recorded in the outputs
 */
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const baseRef = process.env.PREVIEW_BASE_REF || 'origin/main';
const previewUrl = (process.env.PREVIEW_URL || '').replace(/\/+$/, '');
const buildSha = process.env.GITHUB_SHA || '';

const MANIFEST_PATH = 'dspublisher/changes/changes.json';
const COMMENT_PATH = 'preview-comment.md';

// Needles shorter than this (after normalization) are too likely to produce
// false-positive highlights and are dropped.
const MIN_NEEDLE_LENGTH = 12;

// Caps on the removed source kept per deletion, to bound the published
// manifest size. Reviewers get the full context from the GitHub diff.
const MAX_DELETION_LINES = 30;
const MAX_DELETION_LINE_LENGTH = 200;

// Runs git with an argv array (no shell), avoiding injection and quoting issues.
function git(args) {
  return execFileSync('git', args, { encoding: 'utf8', maxBuffer: 256 * 1024 * 1024 });
}

/**
 * Walks a single hunk's body lines (each `[marker, text]`) and records every
 * contiguous run of removed lines, together with the surviving lines (context
 * or added — both exist in the new version) immediately before and after it,
 * nearest first. Those surviving lines are later resolved to a rendered block
 * the deletion marker can be anchored to.
 */
function extractDeletions(entry, hunkLines) {
  let i = 0;
  while (i < hunkLines.length) {
    if (hunkLines[i][0] !== '-') {
      i++;
      continue;
    }
    const removed = [];
    let j = i;
    while (j < hunkLines.length && hunkLines[j][0] === '-') {
      removed.push(hunkLines[j][1]);
      j++;
    }
    const beforeLines = [];
    for (let k = i - 1; k >= 0; k--) {
      if (hunkLines[k][0] !== '-') beforeLines.push(hunkLines[k][1]);
    }
    const afterLines = [];
    for (let k = j; k < hunkLines.length; k++) {
      if (hunkLines[k][0] !== '-') afterLines.push(hunkLines[k][1]);
    }
    entry.deletions.push({ removed, beforeLines, afterLines });
    i = j;
  }
}

/**
 * Parses `git diff` output (with context) into
 * [{ file, status, addedLines, added, removed, deletions }].
 */
function parseDiff(diffText) {
  const entries = [];
  let current = null;
  let hunkLines = null;

  const flushHunk = () => {
    if (current && hunkLines) {
      extractDeletions(current, hunkLines);
    }
    hunkLines = null;
  };

  for (const line of diffText.split('\n')) {
    if (line.startsWith('diff --git ')) {
      flushHunk();
      current = { file: null, status: 'modified', addedLines: [], added: 0, removed: 0, deletions: [] };
      entries.push(current);
    } else if (!current) {
      continue;
    } else if (line.startsWith('new file mode')) {
      current.status = 'added';
    } else if (line.startsWith('deleted file mode')) {
      current.status = 'deleted';
    } else if (line.startsWith('rename to ')) {
      current.status = 'renamed';
    } else if (!hunkLines && line.startsWith('+++ b/')) {
      // File headers only appear before the first @@; guarding on !hunkLines
      // avoids mistaking a hunk body line like "+++ b/..." for a header.
      current.file = line.slice('+++ b/'.length);
    } else if (!hunkLines && line.startsWith('--- a/') && current.file == null) {
      current.file = line.slice('--- a/'.length);
    } else if (line.startsWith('@@')) {
      flushHunk();
      hunkLines = [];
    } else if (hunkLines) {
      // Inside a hunk the first character is the marker; the rest is verbatim
      // content (which may itself start with +++/---), so key only on line[0].
      const marker = line[0];
      if (marker === '+') {
        current.added++;
        current.addedLines.push(line.slice(1));
        hunkLines.push(['+', line.slice(1)]);
      } else if (marker === '-') {
        current.removed++;
        hunkLines.push(['-', line.slice(1)]);
      } else if (marker === ' ') {
        hunkLines.push([' ', line.slice(1)]);
      }
      // Other markers (e.g. "\ No newline at end of file") are ignored.
    }
  }
  flushHunk();
  return entries.filter((e) => e.file && e.file !== '/dev/null');
}

/** Normalizes text the same way preview-diff.ts normalizes rendered DOM text. */
function normalize(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

const SKIP_LINE = /^(\/\/|include::|ifdef::|ifndef::|ifeval::|endif::|image::|video::|audio::|toc::|:[!\w][\w.-]*:)/;
const DELIMITER_LINE = /^(-{2,}|={4,}|\.{4,}|\+{4,}|_{4,}|\*{4,}|\/{4,}|\|===.*|''')\s*$/;
const ATTRIBUTE_LINE = /^\[.*\]$/;
const CALLOUT_LINE = /^<\d+>/;
const FRONT_MATTER_KEY = /^([a-z][a-z0-9-]*):\s+(.*)$/;
// Keys actually used in this repo's YAML front matter. Only these are treated
// as front matter, so prose / code lines like "kind: Service" or "user: User"
// are still processed as normal content.
const FRONT_MATTER_KEYS = new Set([
  'title',
  'page-title',
  'meta-description',
  'description',
  'order',
  'section-nav',
  'page-links',
  'layout',
  'tab-title',
  'version',
  'url',
]);
// Front-matter keys whose value is rendered in the page body.
const RENDERED_FRONT_MATTER_KEYS = new Set(['title', 'description']);

/**
 * Returns the front-matter key match for a line, or null. Front matter is
 * unindented YAML at the top of the file, so the (untrimmed) source line must
 * start at column 0 — this avoids mistaking indented `key: value` lines inside
 * code blocks (e.g. `  description: string;`) for front matter.
 */
function frontMatterKey(sourceLine, trimmed) {
  if (/^\s/.test(sourceLine)) {
    return null;
  }
  const match = trimmed.match(FRONT_MATTER_KEY);
  return match && FRONT_MATTER_KEYS.has(match[1]) ? match : null;
}

/** Strips AsciiDoc inline markup, returning plain-text fragments of the line. */
function stripInlineMarkup(text) {
  let t = text;
  // Macros where the bracket content is the rendered text
  t = t.replace(/xref:[^\s\[\]]*\[([^\]]*)\]/g, '$1');
  t = t.replace(/(?:link:|mailto:)[^\s\[\]]*\[([^\]]*)\]/g, '$1');
  t = t.replace(/https?:\/\/[^\s\[\]]*\[([^\]]*)\]/g, '$1');
  t = t.replace(/(?:menu|btn|kbd):\[?([^\]]*)\]?/g, '$1');
  t = t.replace(/<<[^>,]*,([^>]*)>>/g, '$1');
  t = t.replace(/<<([^>]*)>>/g, '$1');
  // Macros that render as something else entirely
  t = t.replace(/image:[^\s\[\]]*\[[^\]]*\]/g, ' ');
  t = t.replace(/footnote:[^\[]*\[[^\]]*\]/g, ' ');
  // Role spans: [.classname]#text#
  t = t.replace(/\[[^\]]*\]#([^#]*)#/g, '$1');
  // Inline style roles before formatted text: [classname]`Foo`, [filename]`x.txt`
  t = t.replace(/\[[\w.-]+\]/g, ' ');
  // Formatting pairs; normalization removes the symbols anyway, but unbalanced
  // markers around attribute boundaries are cleaner without them
  t = t.replace(/[*_`#^~]/g, '');
  // Attribute references render as unknown values: split the needle there
  return t.split(/\{[^}]+\}/);
}

/** Converts one added AsciiDoc source line into zero or more match needles. */
function adocLineToNeedles(line) {
  let t = line.trim();
  if (!t || SKIP_LINE.test(t) || DELIMITER_LINE.test(t) || ATTRIBUTE_LINE.test(t) || CALLOUT_LINE.test(t)) {
    return [];
  }
  const frontMatter = frontMatterKey(line, t);
  if (frontMatter) {
    if (!RENDERED_FRONT_MATTER_KEYS.has(frontMatter[1])) {
      return [];
    }
    t = frontMatter[2];
  }
  // Section title / list item / description list markers
  t = t.replace(/^=+\s+/, '');
  t = t.replace(/^(?:\*+|\.+|-)\s+/, '');
  t = t.replace(/^([^:]+)::\s*/, '$1 ');
  // Table rows: each cell is rendered separately
  const cells = t.startsWith('|') ? t.split('|') : [t];
  const needles = [];
  for (const cell of cells) {
    for (const fragment of stripInlineMarkup(cell)) {
      const needle = normalize(fragment);
      if (needle.length >= MIN_NEEDLE_LENGTH) {
        needles.push(needle);
      }
    }
  }
  return needles;
}

/** Converts one added code-example line into a match needle (code renders verbatim). */
function codeLineToNeedles(line) {
  const t = line.replace(/\/\/\s*(hidden-source-line|tag::.*|end::.*)$/, '').trim();
  if (!t || /^(\/\/|#|\*)/.test(t)) {
    return [];
  }
  const needle = normalize(t);
  return needle.length >= MIN_NEEDLE_LENGTH ? [needle] : [];
}

/** Returns the first usable anchor needle from a list of surviving lines. */
function firstNeedle(lines, isCode) {
  for (const line of lines) {
    const needles = isCode ? codeLineToNeedles(line) : adocLineToNeedles(line);
    if (needles.length > 0) {
      return needles[0];
    }
  }
  return null;
}

/** True if every removed line is blank or pure AsciiDoc structure (not worth showing). */
function isStructuralOnly(lines) {
  return lines.every((line) => {
    const t = line.trim();
    if (
      !t ||
      SKIP_LINE.test(t) ||
      DELIMITER_LINE.test(t) ||
      ATTRIBUTE_LINE.test(t) ||
      CALLOUT_LINE.test(t)
    ) {
      return true;
    }
    // Front-matter metadata that isn't rendered in the page body (e.g.
    // page-title, meta-description, order) shouldn't produce removal markers.
    const frontMatter = frontMatterKey(line, t);
    return frontMatter != null && !RENDERED_FRONT_MATTER_KEYS.has(frontMatter[1]);
  });
}

/** Trims leading and trailing blank lines from a removed run. */
function trimBlankEdges(lines) {
  let start = 0;
  let end = lines.length;
  while (start < end && lines[start].trim() === '') start++;
  while (end > start && lines[end - 1].trim() === '') end--;
  return lines.slice(start, end);
}

/** Caps the removed source kept for display so the manifest stays small. */
function capRemovedText(lines) {
  let capped = lines.map((line) =>
    line.length > MAX_DELETION_LINE_LENGTH ? `${line.slice(0, MAX_DELETION_LINE_LENGTH)} …` : line
  );
  if (capped.length > MAX_DELETION_LINES) {
    const extra = capped.length - MAX_DELETION_LINES;
    capped = capped.slice(0, MAX_DELETION_LINES);
    capped.push(`… ${extra} more removed line${extra === 1 ? '' : 's'} — see the GitHub diff`);
  }
  return capped;
}

/**
 * Turns the raw removed runs of a file into deletion records:
 * { before, after, text } where before/after are anchor needles (or null) for
 * the surviving blocks around the deletion, and text is the removed source to
 * display. Structural-only and empty runs are dropped.
 */
function buildDeletionRecords(deletions, isCode) {
  const records = [];
  for (const d of deletions) {
    const text = trimBlankEdges(d.removed);
    if (text.length === 0 || isStructuralOnly(text)) {
      continue;
    }
    records.push({
      before: firstNeedle(d.beforeLines, isCode),
      after: firstNeedle(d.afterLines, isCode),
      text: capRemovedText(text),
    });
  }
  return records;
}

// AsciiDoc source files use either extension.
const ADOC_EXTENSION = /\.(adoc|asciidoc)$/;
function isAdoc(file) {
  return ADOC_EXTENSION.test(file);
}

/** Extracts the addition needles and deletion records contributed by one file. */
function payloadFor(entry) {
  const isCode = !isAdoc(entry.file);
  const needles = isCode
    ? entry.addedLines.flatMap(codeLineToNeedles)
    : entry.addedLines.flatMap(adocLineToNeedles);
  return { needles, deletions: buildDeletionRecords(entry.deletions, isCode) };
}

/** Removes duplicate deletion records (same anchors and removed text). */
function dedupeDeletions(deletions) {
  const seen = new Set();
  const out = [];
  for (const d of deletions) {
    const key = JSON.stringify([d.before, d.after, d.text]);
    if (!seen.has(key)) {
      seen.add(key);
      out.push(d);
    }
  }
  return out;
}

/** Maps an article file path to the URL path of the page it produces. */
function fileToPagePath(file) {
  let p = file.replace(/^articles\//, '').replace(ADOC_EXTENSION, '');
  if (p === 'index' || p.endsWith('/index')) {
    p = p.replace(/\/?index$/, '');
  }
  return p;
}

function isPartial(file) {
  return path.posix.basename(file).startsWith('_');
}

/**
 * Resolves an `include::` target to a repo-relative path matching the paths git
 * reports, or null when the target uses an attribute we can't resolve.
 * `{root}` maps to the repo root and `{articles}` to the articles directory;
 * other targets are resolved relative to the including file.
 */
function resolveIncludePath(includerFile, target) {
  let t = target.trim();
  t = t.replace(/^\{root\}/, '');
  t = t.replace(/^\{articles\}/, 'articles');
  if (t.includes('{')) {
    // Unresolved attribute (e.g. {root-fix}); fall back to basename matching.
    return null;
  }
  if (t.startsWith('/')) {
    t = t.slice(1);
  }
  // Use path.posix so keys stay repo-style (forward slashes) on all platforms.
  if (/^(articles|src|frontend)\//.test(t)) {
    return path.posix.normalize(t);
  }
  return path.posix.normalize(path.posix.join(path.posix.dirname(includerFile), t));
}

/**
 * Builds reverse include maps used to resolve changed partials and code
 * examples to the pages where their content is rendered:
 * - byPath: repo-relative resolved path -> set of including .adoc files
 * - byBasename: file basename -> set of including files (fallback for
 *   targets whose path can't be resolved)
 */
function buildIncluderMap() {
  const byPath = new Map();
  const byBasename = new Map();
  const add = (map, key, includer) => {
    if (!map.has(key)) {
      map.set(key, new Set());
    }
    map.get(key).add(includer);
  };
  const stack = ['articles'];
  while (stack.length > 0) {
    const dir = stack.pop();
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.posix.join(dir, entry.name);
      if (entry.isDirectory()) {
        stack.push(full);
      } else if (isAdoc(entry.name)) {
        const content = fs.readFileSync(full, 'utf8');
        for (const match of content.matchAll(/^include::([^\[]+)\[/gm)) {
          const target = match[1].trim();
          add(byBasename, path.posix.basename(target), full);
          const resolved = resolveIncludePath(full, target);
          if (resolved) {
            add(byPath, resolved, full);
          }
        }
      }
    }
  }
  return { byPath, byBasename };
}

function main() {
  const mergeBase = git(['merge-base', baseRef, 'HEAD']).trim();
  // Context lines (-U3) are needed to anchor deletions to surviving blocks.
  const diffText = git([
    'diff',
    '--no-color',
    '-U3',
    mergeBase,
    'HEAD',
    '--',
    'articles',
    'src',
    'frontend',
  ]);
  const entries = parseDiff(diffText);

  const includerMap = buildIncluderMap();

  // path -> page record
  const pages = new Map();
  const unmapped = [];

  function pageFor(file, status) {
    const pagePath = fileToPagePath(file);
    if (!pages.has(pagePath)) {
      pages.set(pagePath, {
        path: pagePath,
        file,
        status,
        added: 0,
        removed: 0,
        needles: [],
        deletions: [],
      });
    }
    return pages.get(pagePath);
  }

  // Resolves a changed partial or code example to the non-partial pages that
  // (transitively) include it, and attaches its needles and deletions there.
  function attachToIncluders(file, payload, seen = new Set()) {
    if (seen.has(file)) {
      return false;
    }
    seen.add(file);
    // Prefer matching by full resolved path; fall back to basename for targets
    // whose path could not be resolved when the map was built.
    const includers =
      includerMap.byPath.get(path.posix.normalize(file)) ||
      includerMap.byBasename.get(path.posix.basename(file));
    if (!includers || includers.size === 0) {
      return false;
    }
    let attached = false;
    for (const includer of includers) {
      if (isPartial(includer)) {
        attached = attachToIncluders(includer, payload, seen) || attached;
      } else {
        const page = pages.has(fileToPagePath(includer))
          ? pages.get(fileToPagePath(includer))
          : pageFor(includer, 'includes-changes');
        page.needles.push(...payload.needles);
        page.deletions.push(...payload.deletions);
        attached = true;
      }
    }
    return attached;
  }

  const sharedEntries = [];
  for (const entry of entries) {
    const isArticle = entry.file.startsWith('articles/') && isAdoc(entry.file);
    if (isArticle && !isPartial(entry.file)) {
      if (entry.status === 'deleted') {
        unmapped.push({ file: entry.file, status: 'deleted' });
        continue;
      }
      const page = pageFor(entry.file, entry.status);
      page.status = entry.status;
      page.added += entry.added;
      page.removed += entry.removed;
      const payload = payloadFor(entry);
      page.needles.push(...payload.needles);
      page.deletions.push(...payload.deletions);
    } else {
      sharedEntries.push(entry);
    }
  }

  // Partials and code examples are resolved after direct page changes so their
  // content merges into already-registered pages instead of duplicating them.
  for (const entry of sharedEntries) {
    if (entry.status === 'deleted') {
      unmapped.push({ file: entry.file, status: 'deleted' });
      continue;
    }
    if (!attachToIncluders(entry.file, payloadFor(entry))) {
      unmapped.push({ file: entry.file, status: entry.status });
    }
  }

  const pageList = [...pages.values()]
    .map((p) => ({
      ...p,
      needles: [...new Set(p.needles)],
      deletions: dedupeDeletions(p.deletions),
    }))
    .sort((a, b) => a.path.localeCompare(b.path));

  const manifest = {
    base: mergeBase,
    sha: buildSha,
    pages: pageList,
    unmapped,
  };

  fs.mkdirSync(path.dirname(MANIFEST_PATH), { recursive: true });
  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2));

  fs.writeFileSync(COMMENT_PATH, buildComment(pageList, unmapped));

  console.log(
    `Wrote ${MANIFEST_PATH}: ${pageList.length} changed page(s), ${unmapped.length} unmapped file(s)`
  );
}

function buildComment(pageList, unmapped) {
  const lines = [];
  lines.push('### Preview Deployment');
  lines.push('');
  lines.push('This PR has been deployed for preview.');
  lines.push('');
  lines.push(`**URL:** ${previewUrl}`);
  lines.push('');
  if (pageList.length > 0) {
    lines.push('#### Changed pages');
    lines.push('');
    lines.push('Added content is highlighted in green; removed content is marked in red on each page.');
    lines.push('');
    for (const page of pageList) {
      const url = `${previewUrl}/${page.path}`;
      const base =
        page.status === 'includes-changes'
          ? 'shared content changed'
          : `${page.status}, +${page.added}/-${page.removed} lines`;
      const removals = page.deletions.length > 0 ? `, ${page.deletions.length} removal marker(s)` : '';
      lines.push(`- [${page.path || 'front page'}](${url}) — ${base}${removals}`);
    }
    lines.push('');
  } else {
    lines.push('_No documentation page changes detected._');
    lines.push('');
  }
  if (unmapped.length > 0) {
    lines.push('#### Other changed files');
    lines.push('');
    for (const file of unmapped) {
      lines.push(`- \`${file.file}\` (${file.status})`);
    }
    lines.push('');
  }
  lines.push(`_Built from ${buildSha}_`);
  lines.push('');
  return lines.join('\n');
}

main();
