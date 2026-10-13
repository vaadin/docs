/**
 * Unit tests for check-redirects.mjs: which files are pages and where they are
 * served, how removed pages are matched with redirects, and how the redirects
 * themselves are validated. The last tests run the git plumbing against a
 * throwaway repository.
 *
 * Run with `npm test` from the repository root.
 */
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, renameSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import test from 'node:test';
import {
  checkRedirects,
  checkWorkingTree,
  hasTitle,
  normalizeUrl,
  pageUrl,
} from './check-redirects.mjs';

const page = (title) => `---\ntitle: ${title}\norder: 1\n---\n\n= ${title}\n`;

test('pageUrl drops the extension and a trailing index, like dspublisher', () => {
  assert.equal(pageUrl('articles/flow/routing/index.adoc'), '/flow/routing');
  assert.equal(pageUrl('articles/flow/routing/layout.adoc'), '/flow/routing/layout');
  assert.equal(
    pageUrl('articles/hilla/lit/guides/forms/strategy.asciidoc'),
    '/hilla/lit/guides/forms/strategy'
  );
  assert.equal(pageUrl('articles/index.adoc'), '/');
  // Only a whole path segment is an index.
  assert.equal(pageUrl('articles/flow/reindex.adoc'), '/flow/reindex');
});

test('normalizeUrl ignores slashes, queries, and fragments', () => {
  assert.equal(normalizeUrl('/flow/routing'), '/flow/routing');
  assert.equal(normalizeUrl('flow/routing/'), '/flow/routing');
  assert.equal(normalizeUrl('/flow/routing#layouts'), '/flow/routing');
  assert.equal(normalizeUrl('/flow/routing?tab=java'), '/flow/routing');
  assert.equal(normalizeUrl('/'), '/');
});

test('hasTitle recognizes pages by the title in their front matter', () => {
  assert.equal(hasTitle(page('Routing')), true);
  assert.equal(hasTitle(page('"Routing"')), true);
  assert.equal(hasTitle('\uFEFF---\r\ntitle: Routing\r\n---\r\n'), true);
  // A partial has no front matter.
  assert.equal(hasTitle('= Shared Section\n\ntitle: not front matter\n'), false);
  assert.equal(hasTitle('---\norder: 1\n---\n'), false);
  assert.equal(hasTitle('---\ntitle:\norder: 1\n---\n'), false);
  assert.equal(hasTitle("---\ntitle: ''\n---\n"), false);
  // A title in the body, like in a YAML example, doesn't count.
  assert.equal(hasTitle('---\norder: 1\n---\n\n----\ntitle: Example\n----\n'), false);
});

/** Shorthand for checkRedirects() with the page maps built from URL lists. */
function check({ before = [], after = [], redirects = {}, renames = new Map() }) {
  const pages = (urls) => new Map(urls.map((url) => [url, `articles${url}.adoc`]));
  return checkRedirects({ before: pages(before), after: pages(after), redirects, renames });
}

test('a removed page needs a redirect', () => {
  const { missing, invalid } = check({ before: ['/a', '/b'], after: ['/b'] });
  assert.deepEqual(missing, [{ url: '/a', file: 'articles/a.adoc', newFile: null, newUrl: null }]);
  assert.deepEqual(invalid, []);
});

test('a moved page needs a redirect, and the new URL is suggested', () => {
  const { missing } = check({
    before: ['/old'],
    after: ['/new'],
    renames: new Map([['articles/old.adoc', 'articles/new.adoc']]),
  });
  assert.deepEqual(missing, [
    { url: '/old', file: 'articles/old.adoc', newFile: 'articles/new.adoc', newUrl: '/new' },
  ]);
});

test('a page moved into a partial gets no suggestion', () => {
  const { missing } = check({
    before: ['/old'],
    after: [],
    renames: new Map([['articles/old.adoc', 'articles/_old.adoc']]),
  });
  assert.equal(missing[0].newFile, 'articles/_old.adoc');
  assert.equal(missing[0].newUrl, null);
});

test('a page whose URL is still served needs no redirect', () => {
  // E.g. articles/a.adoc moved to articles/a/index.adoc.
  const { missing } = checkRedirects({
    before: new Map([['/a', 'articles/a.adoc']]),
    after: new Map([['/a', 'articles/a/index.adoc']]),
    redirects: {},
  });
  assert.deepEqual(missing, []);
});

test('a redirect matches a removed page regardless of slashes', () => {
  for (const source of ['/a', 'a', '/a/']) {
    const { missing, invalid } = check({
      before: ['/a'],
      after: ['/b'],
      redirects: { [source]: '/b' },
    });
    assert.deepEqual(missing, [], source);
    assert.deepEqual(invalid, [], source);
  }
});

test('the missing redirects are listed in URL order', () => {
  const { missing } = check({ before: ['/c', '/a/b', '/a'], after: [] });
  assert.deepEqual(
    missing.map((m) => m.url),
    ['/a', '/a/b', '/c']
  );
});

test('a redirect can lead to a page, a section, an external URL, or another redirect', () => {
  const { invalid } = check({
    after: ['/', '/d'],
    redirects: {
      '/a': '/d',
      '/b': '/d#section',
      '/c': 'https://vaadin.com/',
      '/e': '/a',
      '/f': { status: 302, destination: '/d' },
      '/g': '/',
    },
  });
  assert.deepEqual(invalid, []);
});

test('a redirect to something that is not a page is reported', () => {
  const { invalid } = check({
    after: ['/d'],
    redirects: { '/a': '/typo', '/b': '/c', '/c': '/gone' },
  });
  assert.deepEqual(invalid, [
    "/a → /typo: /typo isn't a page",
    "/b → /c → /gone: /gone isn't a page",
    "/c → /gone: /gone isn't a page",
  ]);
});

test('a redirect without a destination is reported', () => {
  const { invalid } = check({ redirects: { '/a': { status: 301 } } });
  assert.deepEqual(invalid, ['/a: /a has no destination']);
});

test('a redirect loop is reported', () => {
  const { invalid } = check({ redirects: { '/a': '/b', '/b': '/a/' } });
  assert.deepEqual(invalid, [
    '/a → /b → /a: the redirects form a loop',
    '/b → /a → /b: the redirects form a loop',
  ]);
});

test('a redirect from an existing page is reported, as dspublisher refuses to build', () => {
  const { invalid } = check({ after: ['/a', '/b'], redirects: { '/a/': '/b' } });
  assert.equal(invalid.length, 1);
  assert.match(invalid[0], /^\/a: \/a is the URL of articles\/a\.adoc/);
});

/** Creates a git repository with the given files committed, and returns its path. */
function repository(files) {
  const root = mkdtempSync(join(tmpdir(), 'check-redirects-'));
  const git = (...args) =>
    execFileSync('git', ['-c', 'user.name=Test', '-c', 'user.email=test@example.com', ...args], {
      cwd: root,
      stdio: 'pipe',
    });
  git('init', '--quiet');
  for (const [file, content] of Object.entries(files)) {
    mkdirSync(join(root, dirname(file)), { recursive: true });
    writeFileSync(join(root, file), content);
  }
  git('add', '--all');
  git('commit', '--quiet', '--message', 'Initial commit');
  return { root, git };
}

const config = (redirects) => JSON.stringify({ redirects }, null, 2);

test('checkWorkingTree finds the pages that a change removes or moves', (t) => {
  const { root, git } = repository({
    'dspublisher/config/default.json': config({}),
    'articles/index.adoc': page('Home'),
    // Multi-byte characters before the other files, which have to be read at
    // the right byte offsets.
    'articles/a.adoc': page('Ä page with ümlauts — and more'),
    'articles/moved.adoc': page('Moved'),
    'articles/removed.adoc': page('Removed'),
    'articles/to-index.adoc': page('To Index'),
    'articles/_partial.adoc': 'A partial.\n',
  });
  t.after(() => rmSync(root, { recursive: true, force: true }));
  const base = execFileSync('git', ['rev-parse', 'HEAD'], { cwd: root, encoding: 'utf8' }).trim();

  git('mv', 'articles/moved.adoc', 'articles/new-place.adoc');
  git('rm', '--quiet', 'articles/removed.adoc', 'articles/_partial.adoc');
  mkdirSync(join(root, 'articles/to-index'));
  // Moved without git, so the check has to rely on the working tree.
  renameSync(join(root, 'articles/to-index.adoc'), join(root, 'articles/to-index/index.adoc'));

  const { missing, invalid } = checkWorkingTree(root, base);
  assert.deepEqual(missing, [
    {
      url: '/moved',
      file: 'articles/moved.adoc',
      newFile: 'articles/new-place.adoc',
      newUrl: '/new-place',
    },
    { url: '/removed', file: 'articles/removed.adoc', newFile: null, newUrl: null },
  ]);
  assert.deepEqual(invalid, []);

  writeFileSync(
    join(root, 'dspublisher/config/default.json'),
    config({ '/moved': '/new-place', '/removed': '/' })
  );
  assert.deepEqual(checkWorkingTree(root, base), { missing: [], invalid: [] });
});

test('checkWorkingTree compares with the merge base, not the tip of the ref', (t) => {
  const { root, git } = repository({
    'dspublisher/config/default.json': config({}),
    'articles/index.adoc': page('Home'),
  });
  t.after(() => rmSync(root, { recursive: true, force: true }));
  git('branch', 'base');
  git('checkout', '--quiet', '-b', 'feature');
  // A page that only the base branch added isn't removed by the feature branch.
  git('checkout', '--quiet', 'base');
  writeFileSync(join(root, 'articles/new.adoc'), page('New'));
  git('add', '--all');
  git('commit', '--quiet', '--message', 'Add a page');
  git('checkout', '--quiet', 'feature');

  assert.deepEqual(checkWorkingTree(root, 'base'), { missing: [], invalid: [] });
  assert.throws(
    () => checkWorkingTree(root, 'does-not-exist'),
    /Can't find where HEAD branched off/
  );
});
