#!/usr/bin/env node

/**
 * Fails when a change removes or moves a documentation page without adding a
 * redirect from its old URL to dspublisher/config/default.json, so that links
 * from search results, bookmarks, and other sites don't end on a 404 page.
 *
 * A page is what dspublisher renders one for: an AsciiDoc file under articles/
 * with a title in its front matter. Its URL is the file's path without the
 * extension and without a trailing /index. A page counts as removed only when
 * no page serves its URL anymore, so moving foo.adoc to foo/index.adoc needs no
 * redirect.
 *
 * The redirects themselves are checked as well, since one that ends on a 404
 * page is no better than none: each has to lead to a page, either directly or
 * through other redirects, or to an external URL. A redirect from the URL of a
 * page is reported too, as dspublisher refuses to build with one.
 *
 * Usage:
 *   node scripts/check-redirects.mjs          # compare with origin/main
 *   node scripts/check-redirects.mjs <ref>    # compare with another branch or commit
 *
 * The working tree, uncommitted changes included, is compared with its merge
 * base with the given ref.
 */

import { execFileSync } from 'node:child_process';
import { readdirSync, readFileSync } from 'node:fs';
import { dirname, join, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT_DIR = join(__dirname, '..');
const CONFIG_PATH = 'dspublisher/config/default.json';
const DEFAULT_BASE_REF = 'origin/main';

// dspublisher renders both extensions.
const ADOC_EXTENSION = /\.(adoc|asciidoc)$/;

// dspublisher passes these destinations through as they are.
const EXTERNAL_URL = /^https?:\/\//;

/** Maps an article file path to the URL path of the page it produces, as dspublisher does. */
export function pageUrl(file) {
  const url = file
    .replace(/^articles/, '')
    .replace(ADOC_EXTENSION, '')
    .replace(/\/index$/, '');
  return url === '' ? '/' : url;
}

/**
 * Normalizes a redirect source or destination to the form pageUrl() returns.
 * dspublisher ignores leading and trailing slashes when it matches redirect
 * sources with articles, and a query or fragment doesn't change the page.
 */
export function normalizeUrl(path) {
  return `/${path.replace(/[?#].*$/, '').replace(/^\/+|\/+$/g, '')}`;
}

/**
 * True when the file has a title in its front matter, which is what makes
 * dspublisher render a page for it. Partials have none.
 */
export function hasTitle(content) {
  const frontMatter = /^\uFEFF?---\r?\n([\s\S]*?)\r?\n---[ \t]*(?:\r?\n|$)/.exec(content);
  if (!frontMatter) {
    return false;
  }
  const title = /^title:(.*)$/m.exec(frontMatter[1])?.[1] ?? '';
  return (
    title
      .trim()
      .replace(/^(["'])(.*)\1$/, '$2')
      .trim() !== ''
  );
}

/**
 * Follows a redirect to where it ends, and returns why that isn't a page or an
 * external URL, or null when it is.
 */
function redirectProblem(source, destinations, pages) {
  const chain = [source];
  let url = source;
  for (;;) {
    const destination = destinations.get(url);
    if (typeof destination !== 'string') {
      return `${chain.join(' → ')}: ${url} has no destination`;
    }
    if (EXTERNAL_URL.test(destination)) {
      return null;
    }
    url = normalizeUrl(destination);
    if (chain.includes(url)) {
      return `${[...chain, url].join(' → ')}: the redirects form a loop`;
    }
    chain.push(url);
    if (pages.has(url)) {
      return null;
    }
    if (!destinations.has(url)) {
      return `${chain.join(' → ')}: ${url} isn't a page`;
    }
  }
}

/**
 * Compares the pages before and after a change with the redirects after it.
 * `before` and `after` map each page URL to its file, `redirects` is the
 * dspublisher setting, and `renames` maps the files that moved to their new
 * paths.
 *
 * Returns the removed pages that have no redirect, each with the URL of the
 * page it moved to when there is one, and a description of each broken
 * redirect.
 */
export function checkRedirects({ before, after, redirects, renames = new Map() }) {
  // Astro also accepts { status, destination } in place of the destination.
  const destinations = new Map(
    Object.entries(redirects).map(([source, redirect]) => [
      normalizeUrl(source),
      typeof redirect === 'string' ? redirect : redirect?.destination,
    ])
  );

  const missing = [];
  for (const [url, file] of before) {
    if (!after.has(url) && !destinations.has(url)) {
      const newFile = renames.get(file) ?? null;
      const newUrl = newFile && after.has(pageUrl(newFile)) ? pageUrl(newFile) : null;
      missing.push({ url, file, newFile, newUrl });
    }
  }
  // Sorted like the redirects in the config, so the suggestions paste in as they are.
  missing.sort((a, b) => a.url.localeCompare(b.url));

  const invalid = [];
  for (const source of destinations.keys()) {
    if (after.has(source)) {
      invalid.push(
        `${source}: ${source} is the URL of ${after.get(source)}, and dspublisher doesn't ` +
          'build with a redirect from an existing page. Remove either the redirect or the page.'
      );
      continue;
    }
    const problem = redirectProblem(source, destinations, after);
    if (problem) {
      invalid.push(problem);
    }
  }

  return { missing, invalid };
}

/** Runs git in the given directory with an argv array (no shell). */
function git(root, args) {
  return execFileSync('git', args, {
    cwd: root,
    encoding: 'utf8',
    maxBuffer: 256 * 1024 * 1024,
    stdio: 'pipe',
  });
}

/** Reads the given files as they were at a revision, with a single git process. */
function readFilesAt(root, rev, files) {
  const output = execFileSync('git', ['cat-file', '--batch'], {
    cwd: root,
    input: files.map((file) => `${rev}:${file}\n`).join(''),
    maxBuffer: 256 * 1024 * 1024,
  });
  // Each file comes out as "<sha> blob <size>\n<content>\n". The size is in
  // bytes, so the output is sliced as a buffer before it's decoded.
  const contents = new Map();
  let offset = 0;
  for (const file of files) {
    const headerEnd = output.indexOf('\n', offset);
    const size = Number(output.toString('utf8', offset, headerEnd).split(' ')[2]);
    contents.set(file, output.toString('utf8', headerEnd + 1, headerEnd + 1 + size));
    offset = headerEnd + 1 + size + 1;
  }
  return contents;
}

/** The pages at a revision, as a map from URL to file. */
function pagesAt(root, rev) {
  const files = git(root, ['ls-tree', '-r', '-z', '--name-only', rev, '--', 'articles/'])
    .split('\0')
    .filter((file) => ADOC_EXTENSION.test(file));
  const pages = new Map();
  for (const [file, content] of readFilesAt(root, rev, files)) {
    if (hasTitle(content)) {
      pages.set(pageUrl(file), file);
    }
  }
  return pages;
}

/** The pages in the working tree, as a map from URL to file. */
function currentPages(root) {
  const pages = new Map();
  for (const entry of readdirSync(join(root, 'articles'), { recursive: true })) {
    const file = ['articles', ...entry.split(sep)].join('/');
    if (ADOC_EXTENSION.test(file) && hasTitle(readFileSync(join(root, file), 'utf8'))) {
      pages.set(pageUrl(file), file);
    }
  }
  return pages;
}

/** The article files moved since a revision, as a map from old to new path. */
function renamesSince(root, rev) {
  const fields = git(root, [
    'diff',
    '-z',
    '-M',
    '--name-status',
    '--diff-filter=R',
    rev,
    '--',
    'articles/',
  ]).split('\0');
  // Each rename is three fields: R with a similarity score, the old path, and the new path.
  const renames = new Map();
  for (let i = 0; i + 2 < fields.length; i += 3) {
    renames.set(fields[i + 1], fields[i + 2]);
  }
  return renames;
}

/**
 * Checks the working tree in `root` against its merge base with `ref`; see
 * checkRedirects() for the result.
 */
export function checkWorkingTree(root, ref) {
  let base;
  try {
    base = git(root, ['merge-base', ref, 'HEAD']).trim();
  } catch {
    throw new Error(`Can't find where HEAD branched off ${ref}. Fetch it, or pass another ref.`);
  }
  const config = JSON.parse(readFileSync(join(root, CONFIG_PATH), 'utf8'));
  return checkRedirects({
    before: pagesAt(root, base),
    after: currentPages(root),
    redirects: config.redirects ?? {},
    renames: renamesSince(root, base),
  });
}

/** Describes a removed page without a redirect, for the report. */
function describeMissing({ url, file, newFile }) {
  return `${url} (${file}, ${newFile ? `moved to ${newFile}` : 'removed'})`;
}

function main() {
  const ref = process.argv[2] ?? DEFAULT_BASE_REF;
  const { missing, invalid } = checkWorkingTree(PROJECT_DIR, ref);

  if (missing.length === 0 && invalid.length === 0) {
    console.log('Every removed or moved page has a redirect, and every redirect leads to a page.');
    return;
  }

  // In a GitHub Actions run, each problem is also annotated on the check.
  if (process.env.GITHUB_ACTIONS === 'true') {
    for (const page of missing) {
      console.log(`::error file=${CONFIG_PATH}::No redirect from ${describeMissing(page)}`);
    }
    for (const problem of invalid) {
      console.log(`::error file=${CONFIG_PATH}::Broken redirect from ${problem}`);
    }
  }

  if (missing.length > 0) {
    console.error('These pages were removed or moved without a redirect from their old URL:\n');
    for (const page of missing) {
      console.error(`  ${describeMissing(page)}`);
    }
    console.error(
      `\nAdd a redirect for each one to "redirects" in ${CONFIG_PATH}, leading to the page` +
        ' that replaces it:\n'
    );
    for (const { url, newUrl } of missing) {
      console.error(`  "${url}": "${newUrl ?? '/<replacement page>'}",`);
    }
  }

  if (invalid.length > 0) {
    if (missing.length > 0) {
      console.error('');
    }
    console.error(`These redirects in ${CONFIG_PATH} are broken:\n`);
    for (const problem of invalid) {
      console.error(`  ${problem}`);
    }
  }

  process.exit(1);
}

// Only run when invoked as a script, so that the tests can import the checks.
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main();
}
