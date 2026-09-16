/**
 * Generates a manifest of documentation pages changed in the current branch
 * compared to a base ref (default: origin/main).
 *
 * Changes are recorded in two scopes: those the pull request itself introduces
 * (relative to its base branch) and those the base branch introduces on top of
 * the default branch. For a stacked pull request the latter are visible in the
 * preview too, so they're kept in the manifest and highlighted in a different
 * color rather than being hidden or passed off as this PR's work.
 *
 * Outputs:
 * - dspublisher/changes/changes.json: consumed by dspublisher/theme/preview-diff.ts
 *   in preview deployments to highlight changed content on the live site.
 * - preview-comment.md: the sticky PR comment body with links to changed pages.
 *
 * Environment variables:
 * - PREVIEW_BASE_REF: base ref to diff against (default: origin/main; falls
 *   back to origin/main if the given ref no longer exists)
 * - PREVIEW_URL: base URL of the preview deployment (used in the PR comment)
 * - GITHUB_SHA: commit SHA recorded in the outputs
 */
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const FALLBACK_BASE_REF = 'origin/main';
const baseRef = process.env.PREVIEW_BASE_REF || FALLBACK_BASE_REF;
const previewUrl = (process.env.PREVIEW_URL || '').replace(/\/+$/, '');
const buildSha = process.env.GITHUB_SHA || '';

const MANIFEST_PATH = 'dspublisher/changes/changes.json';
const COMMENT_PATH = 'preview-comment.md';

// Needles shorter than this (after normalization) are too likely to produce
// false-positive highlights and are dropped.
const MIN_NEEDLE_LENGTH = 12;

// A maintenance branch (v24, v25.1, …) has diverged from the default branch by
// hundreds of commits, so its whole divergence is in no sense "what the base
// branch adds on top of main" and would bury the pull request's own changes.
const VERSION_BRANCH = /^v?\d+(\.\d+)*$/;

// Any other base branch is judged by how much it actually changes rather than by
// how far back it forked: a stacked branch can sit on a months-old commit of the
// default branch and still carry a handful of changes worth showing, whereas a
// long-lived line of development is recognizable from its size. The file count
// is only a cheap pre-check — one changed partial or code example reaches every
// page that includes it — so the pages actually reached are capped as well.
const MAX_BASE_SCOPE_FILES = 50;
const MAX_BASE_SCOPE_PAGES = 50;

// Caps on what the PR comment lists, and on the comment as a whole: GitHub
// rejects a body longer than 65536 characters, which a large pull request (or
// the fallback to origin/main below) can otherwise reach.
const MAX_LISTED_OWN_PAGES = 150;
const MAX_LISTED_BASE_PAGES = 25;
const MAX_LISTED_UNMAPPED = 50;
const MAX_COMMENT_LENGTH = 65000;

// Caps on the removed source kept per deletion, to bound the published
// manifest size. Reviewers get the full context from the GitHub diff.
const MAX_DELETION_LINES = 30;
const MAX_DELETION_LINE_LENGTH = 200;

// Runs git with an argv array (no shell), avoiding injection and quoting issues.
function git(args) {
  return execFileSync('git', args, { encoding: 'utf8', maxBuffer: 256 * 1024 * 1024 });
}

// The base branch can vanish between the pull request event and this run: for a
// stacked pull request it is deleted as soon as the one below it is merged, and
// the event payload still names it. Rather than failing the whole deployment,
// fall back to the default branch, which only makes the change list noisier.
function resolveBaseRef(ref) {
  try {
    git(['rev-parse', '--verify', '--quiet', `${ref}^{commit}`]);
    return ref;
  } catch {
    console.warn(`Base ref ${ref} not found, diffing against ${FALLBACK_BASE_REF} instead`);
    return FALLBACK_BASE_REF;
  }
}

// Merge base of two refs, or null when it can't be determined (e.g. the ref is
// missing or the histories are unrelated).
function mergeBaseOf(a, b) {
  try {
    return git(['merge-base', a, b]).trim();
  } catch {
    return null;
  }
}

/** Number of files that can affect rendered pages and differ between two commits. */
function changedFileCount(from, to) {
  const out = git(['diff', '--name-only', from, to, '--', 'articles', 'src', 'frontend']).trim();
  return out === '' ? 0 : out.split('\n').length;
}

/** Diff of the paths that can affect rendered pages, between two commits. */
function diffBetween(from, to) {
  // Context lines (-U3) are needed to anchor deletions to surviving blocks.
  return git(['diff', '--no-color', '-U3', from, to, '--', 'articles', 'src', 'frontend']);
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
 * [{ file, oldFile, status, addedLines, added, removed, deletions }].
 * `oldFile` is set only for a rename, whose source path stops being served.
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
      current = {
        file: null,
        oldFile: null,
        status: 'modified',
        addedLines: [],
        added: 0,
        removed: 0,
        deletions: [],
      };
      entries.push(current);
    } else if (!current) {
      continue;
    } else if (line.startsWith('new file mode')) {
      current.status = 'added';
    } else if (line.startsWith('deleted file mode')) {
      current.status = 'deleted';
    } else if (line.startsWith('rename from ')) {
      current.status = 'renamed';
      current.oldFile = line.slice('rename from '.length);
    } else if (line.startsWith('rename to ')) {
      current.status = 'renamed';
      // A rename with no content change has no ---/+++ header at all, so this
      // is the only place the new path appears; without it the whole entry is
      // dropped and the move goes unreported.
      current.file = line.slice('rename to '.length);
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

function deletionKey(deletion) {
  return JSON.stringify([deletion.before, deletion.after, deletion.text]);
}

/** Removes duplicate deletion records (same anchors and removed text). */
function dedupeDeletions(deletions) {
  const seen = new Set();
  const out = [];
  for (const d of deletions) {
    const key = deletionKey(d);
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

/** True for a file the site renders as a page of its own. */
function isPage(file) {
  return file.startsWith('articles/') && isAdoc(file) && !isPartial(file);
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

/**
 * Why the base branch's own changes are not worth marking, or null when they
 * are. A maintenance branch is recognized by name; every other base branch is
 * judged by the size of its divergence, which is what actually makes the base
 * scope unusable — an old fork point on its own does not.
 */
function baseScopeSkipReason(label, fileCount) {
  if (fileCount === 0) {
    // The base branch changed nothing that renders, so there is neither
    // anything to mark nor anything to explain away.
    return null;
  }
  if (VERSION_BRANCH.test(label)) {
    return `${label} is a maintenance branch, not a stacked pull request branch`;
  }
  if (fileCount > MAX_BASE_SCOPE_FILES) {
    return `${label} changes ${fileCount} files, more than the ${MAX_BASE_SCOPE_FILES} that can be shown as context`;
  }
  return null;
}

/**
 * Merges the two scopes collected for one page: duplicates are removed within
 * each scope, and anything this pull request also changed is dropped from the
 * base scope, so its own work is never colored as the base branch's.
 */
function mergeScopes(page) {
  const ownNeedles = new Set(page.needles);
  const ownDeletions = dedupeDeletions(page.deletions);
  const ownDeletionKeys = new Set(ownDeletions.map(deletionKey));
  return {
    ...page,
    needles: [...ownNeedles],
    deletions: ownDeletions,
    baseNeedles: [...new Set(page.baseNeedles)].filter((n) => !ownNeedles.has(n)),
    baseDeletions: dedupeDeletions(page.baseDeletions).filter(
      (d) => !ownDeletionKeys.has(deletionKey(d))
    ),
  };
}

/**
 * Collects one diff into the shared page records. `scope` is 'own' for the
 * changes of this pull request and 'base' for those inherited from the base
 * branch; the two are kept in separate fields so the preview can tell them
 * apart. Only the own scope carries page status, line counts and the list of
 * files that couldn't be mapped to a page, which is what the PR comment
 * reports on. `target` holds the accumulated pages, the unmapped files and the
 * include map, so both scopes collect into the same records.
 */
function collect(entries, scope, { pages, unmapped, deletedPages, includerMap }) {
  const isOwn = scope === 'own';
  const needlesKey = isOwn ? 'needles' : 'baseNeedles';
  const deletionsKey = isOwn ? 'deletions' : 'baseDeletions';

  function pageFor(file, status) {
    const pagePath = fileToPagePath(file);
    // A page this pull request deletes isn't served by the preview, so the base
    // branch's changes to it must not claim it exists. A move git didn't detect
    // as a rename arrives as a delete plus an add of the same page, though, so
    // only the paths the own scope left behind are gone for good.
    if (!isOwn && deletedPages.has(pagePath) && !pages.has(pagePath)) {
      return null;
    }
    if (!pages.has(pagePath)) {
      pages.set(pagePath, {
        path: pagePath,
        file,
        // Stays null for a page that only the base branch changed.
        status: null,
        added: 0,
        removed: 0,
        needles: [],
        deletions: [],
        baseNeedles: [],
        baseDeletions: [],
      });
    }
    const page = pages.get(pagePath);
    if (isOwn && page.status === null) {
      page.status = status;
    }
    return page;
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
        continue;
      }
      const page = pageFor(includer, 'includes-changes');
      if (!page) {
        continue;
      }
      page[needlesKey].push(...payload.needles);
      page[deletionsKey].push(...payload.deletions);
      attached = true;
    }
    return attached;
  }

  const sharedEntries = [];
  // Article paths this pull request stops serving, resolved after the loop
  // below: `report` is false for a rename, whose move the new page already
  // conveys, and true for a deletion, which nothing else would mention.
  const gone = [];
  for (const entry of entries) {
    // A rename moves the page: git reports no deletion for the source path,
    // but the preview stops serving it all the same. Keyed on the path moved
    // away from, not the one moved to, so renaming a page into a partial or
    // out of the articles tree counts just the same.
    if (isOwn && entry.oldFile && isPage(entry.oldFile)) {
      gone.push({ file: entry.oldFile, report: false });
    }
    if (isPage(entry.file)) {
      if (entry.status === 'deleted') {
        if (isOwn) {
          gone.push({ file: entry.file, report: true });
        }
        continue;
      }
      const page = pageFor(entry.file, entry.status);
      if (!page) {
        continue;
      }
      if (isOwn) {
        page.status = entry.status;
        page.added += entry.added;
        page.removed += entry.removed;
      }
      const payload = payloadFor(entry);
      page[needlesKey].push(...payload.needles);
      page[deletionsKey].push(...payload.deletions);
    } else {
      sharedEntries.push(entry);
    }
  }

  // A delete plus an add of the same page is a move git didn't rename-detect,
  // so that page is still served: it neither belongs in the gone set nor should
  // be reported as removed. Only what no direct change put back is really gone.
  for (const { file, report } of gone) {
    const pagePath = fileToPagePath(file);
    if (pages.has(pagePath)) {
      continue;
    }
    deletedPages.add(pagePath);
    if (report) {
      unmapped.push({ file, status: 'deleted' });
    }
  }

  // Partials and code examples are resolved after direct page changes so their
  // content merges into already-registered pages instead of duplicating them.
  for (const entry of sharedEntries) {
    if (entry.status === 'deleted') {
      if (isOwn) {
        unmapped.push({ file: entry.file, status: 'deleted' });
      }
      continue;
    }
    if (!attachToIncluders(entry.file, payloadFor(entry)) && isOwn) {
      unmapped.push({ file: entry.file, status: entry.status });
    }
  }
}

/**
 * Why a base scope that was worth collecting turns out to be too big to show,
 * or null when it isn't. Checked after collecting because shared content fans
 * out: the file count can't predict how many pages a changed partial reaches.
 */
function baseFanOutSkipReason(label, pageCount) {
  if (pageCount > MAX_BASE_SCOPE_PAGES) {
    return (
      `${label} reaches ${pageCount} pages, more than the ` +
      `${MAX_BASE_SCOPE_PAGES} that can be shown as context`
    );
  }
  return null;
}

/** True when any of a page's marked content comes from the base branch. */
function hasBaseChanges(page) {
  return page.baseNeedles.length > 0 || page.baseDeletions.length > 0;
}

/** Strips every base-scope record, leaving only this pull request's changes. */
function dropBaseScope(pages) {
  for (const page of pages.values()) {
    page.baseNeedles = [];
    page.baseDeletions = [];
  }
}

/**
 * Turns the collected records into the manifest's page list: the two scopes are
 * merged, base-only pages left with nothing to show after deduplication are
 * dropped, and the rest are ordered by path.
 */
function finalizePages(pages) {
  return [...pages.values()]
    .map(mergeScopes)
    .filter((p) => p.status !== null || p.baseNeedles.length > 0 || p.baseDeletions.length > 0)
    .sort((a, b) => a.path.localeCompare(b.path));
}

function main() {
  let base = resolveBaseRef(baseRef);
  let mergeBase = mergeBaseOf(base, 'HEAD');
  // A resolvable ref can still share no history with HEAD (a fork pushed with
  // an unrelated history), which used to fail the run on the raw git error.
  if (!mergeBase && base !== FALLBACK_BASE_REF) {
    console.warn(
      `No merge base between ${base} and HEAD, diffing against ${FALLBACK_BASE_REF} instead`
    );
    base = FALLBACK_BASE_REF;
    mergeBase = mergeBaseOf(base, 'HEAD');
  }
  if (!mergeBase) {
    throw new Error(`No merge base between ${base} and HEAD; cannot tell what changed`);
  }
  // Where the base branch itself forked off the default branch. For a pull
  // request targeting the default branch this is the same commit as mergeBase,
  // so the base scope stays empty; for a stacked pull request everything
  // between the two commits is the work of the pull requests below it.
  const baseFork =
    base === FALLBACK_BASE_REF ? mergeBase : mergeBaseOf(FALLBACK_BASE_REF, mergeBase);
  const baseLabel = base.replace(/^origin\//, '');
  const hasBaseScope = Boolean(baseFork) && baseFork !== mergeBase;
  let baseSkipReason = hasBaseScope
    ? baseScopeSkipReason(baseLabel, changedFileCount(baseFork, mergeBase))
    : null;
  if (baseSkipReason) {
    console.log(`Not marking the base branch's changes: ${baseSkipReason}`);
  }

  const target = {
    pages: new Map(),
    unmapped: [],
    deletedPages: new Set(),
    includerMap: buildIncluderMap(),
  };
  collect(parseDiff(diffBetween(mergeBase, 'HEAD')), 'own', target);
  const collectedBase = hasBaseScope && !baseSkipReason;
  if (collectedBase) {
    collect(parseDiff(diffBetween(baseFork, mergeBase)), 'base', target);
  }

  const { unmapped } = target;
  let pageList = finalizePages(target.pages);
  if (collectedBase) {
    // Counted after deduplication: base content this pull request also changed
    // is already gone by now, so the cap measures the pages that would really
    // show blue rather than every page the base diff happened to touch.
    baseSkipReason = baseFanOutSkipReason(baseLabel, pageList.filter(hasBaseChanges).length);
    if (baseSkipReason) {
      console.log(`Not marking the base branch's changes: ${baseSkipReason}`);
      dropBaseScope(target.pages);
      pageList = finalizePages(target.pages);
    }
  }

  const manifest = {
    base: mergeBase,
    baseFork,
    // Null unless the base branch's own changes were deliberately left unmarked;
    // the preview panel and the PR comment say so rather than silently omitting.
    baseSkipped: baseSkipReason,
    sha: buildSha,
    pages: pageList,
    unmapped,
  };

  fs.mkdirSync(path.dirname(MANIFEST_PATH), { recursive: true });
  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2));

  fs.writeFileSync(COMMENT_PATH, buildComment(pageList, unmapped, baseLabel, baseSkipReason));

  const baseOnlyPages = pageList.filter((p) => p.status === null).length;
  const pagesWithBaseChanges = pageList.filter(hasBaseChanges).length;
  console.log(
    `Wrote ${MANIFEST_PATH}: ${pageList.length - baseOnlyPages} changed page(s), ` +
      `${pagesWithBaseChanges} page(s) with base branch changes (${baseOnlyPages} of them ` +
      `only from the base branch), ${unmapped.length} unmapped file(s)`
  );
}

/** How a changed page's own change is described in the PR comment. */
function pageSummary(page) {
  if (page.status === 'includes-changes') {
    return 'shared content changed';
  }
  if (page.status === 'renamed' && page.added === 0 && page.removed === 0) {
    // A move can still pick content up through a changed partial or code
    // example, in which case the page does show highlights and calling it
    // unchanged would be wrong.
    return page.needles.length === 0 && page.deletions.length === 0
      ? 'moved here, content unchanged'
      : 'moved here, shared content changed';
  }
  return `${page.status}, +${page.added}/-${page.removed} lines`;
}

/**
 * Appends a bounded bullet list, with a final "… and N more" line when the cap
 * cut it short, so a truncated listing is never mistaken for a complete one.
 */
function pushCappedList(lines, items, cap, noun, render) {
  for (const item of items.slice(0, cap)) {
    lines.push(`- ${render(item)}`);
  }
  if (items.length > cap) {
    const rest = items.length - cap;
    lines.push(`- … and ${rest} more ${noun}${rest === 1 ? '' : 's'}`);
  }
}

/**
 * Trims a comment body that GitHub would reject. The per-section caps make this
 * unreachable in practice; it's here so an unforeseen combination degrades the
 * listing instead of failing the deployment on the comment step.
 */
function capCommentLength(body, footer = '') {
  if (body.length <= MAX_COMMENT_LENGTH) {
    return body;
  }
  const tail = `\n_Listing truncated: the comment exceeded the maximum length._\n${footer}`;
  const budget = MAX_COMMENT_LENGTH - tail.length;
  const cut = body.lastIndexOf('\n', budget);
  return body.slice(0, cut > 0 ? cut : budget) + tail;
}

function buildComment(pageList, unmapped, baseLabel, baseSkipReason) {
  const lines = [];
  lines.push('### Preview Deployment');
  lines.push('');
  lines.push('This PR has been deployed for preview.');
  lines.push('');
  lines.push(`**URL:** ${previewUrl}`);
  lines.push('');
  const ownPages = pageList.filter((page) => page.status !== null);
  const basePages = pageList.filter((page) => page.status === null);
  if (ownPages.length > 0) {
    lines.push('#### Changed pages');
    lines.push('');
    lines.push('Added content is highlighted in green; removed content is marked in red on each page.');
    if (pageList.some(hasBaseChanges)) {
      lines.push('Changes inherited from the base branch are highlighted in blue.');
    }
    lines.push('');
    pushCappedList(lines, ownPages, MAX_LISTED_OWN_PAGES, 'page', (page) => {
      const url = `${previewUrl}/${page.path}`;
      const base = pageSummary(page);
      const removals =
        page.deletions.length > 0 ? `, ${page.deletions.length} removal marker(s)` : '';
      // Say so where the page also shows blue, so the highlighting on it is
      // never unexplained: the base branch touched it too.
      const inherited = hasBaseChanges(page) ? ', also changed by the base branch' : '';
      return `[${page.path || 'front page'}](${url}) — ${base}${removals}${inherited}`;
    });
    lines.push('');
  } else {
    lines.push('_No documentation page changes detected._');
    lines.push('');
  }
  if (basePages.length > 0) {
    lines.push('#### Pages changed by the base branch');
    lines.push('');
    lines.push(`These come from \`${baseLabel}\`, not from this PR, and are highlighted in blue.`);
    lines.push('');
    pushCappedList(
      lines,
      basePages,
      MAX_LISTED_BASE_PAGES,
      'page',
      (page) => `[${page.path || 'front page'}](${previewUrl}/${page.path})`
    );
    lines.push('');
  } else if (baseSkipReason) {
    lines.push('#### Base branch changes');
    lines.push('');
    lines.push(
      `Not marked in the preview: ${baseSkipReason}. Everything highlighted in the ` +
        'preview belongs to this PR.'
    );
    lines.push('');
  }
  if (unmapped.length > 0) {
    lines.push('#### Other changed files');
    lines.push('');
    pushCappedList(
      lines,
      unmapped,
      MAX_LISTED_UNMAPPED,
      'file',
      (file) => `\`${file.file}\` (${file.status})`
    );
    lines.push('');
  }
  const footer = `_Built from ${buildSha}_`;
  lines.push(footer);
  lines.push('');
  // Keep the footer even when the listing above it has to be trimmed away.
  return capCommentLength(lines.join('\n'), `\n${footer}\n`);
}

// Exported for the unit tests; everything else is exercised through main().
export {
  MAX_COMMENT_LENGTH,
  baseFanOutSkipReason,
  baseScopeSkipReason,
  buildComment,
  capCommentLength,
  collect,
  dedupeDeletions,
  dropBaseScope,
  finalizePages,
  mergeScopes,
  parseDiff,
  resolveBaseRef,
};

// Only self-execute when run as a script, so importing this module for the
// tests doesn't try to write a manifest.
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main();
}
