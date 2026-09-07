/**
 * Unit tests for the pure parts of generate-preview-changes.mjs: the base-scope
 * decision, the own/base scope merge, and the PR comment size limits. The git
 * plumbing and the diff parsing are exercised by running the script itself.
 *
 * Run with `npm test` (or `node --test scripts/`) from the repository root.
 */
import assert from 'node:assert/strict';
import test from 'node:test';

// buildComment reads these when the module is evaluated, so they have to be set
// before the import.
process.env.PREVIEW_URL = 'https://preview.example';
process.env.GITHUB_SHA = 'deadbee';

const {
  MAX_COMMENT_LENGTH,
  baseFanOutSkipReason,
  baseScopeSkipReason,
  buildComment,
  capCommentLength,
  collect,
  dedupeDeletions,
  finalizePages,
  mergeScopes,
  resolveBaseRef,
} = await import('./generate-preview-changes.mjs');

function page(overrides = {}) {
  return {
    path: 'components/button',
    file: 'articles/components/button/index.adoc',
    status: 'modified',
    added: 1,
    removed: 0,
    needles: [],
    deletions: [],
    baseNeedles: [],
    baseDeletions: [],
    ...overrides,
  };
}

function deletion(text, before = 'anchor before', after = 'anchor after') {
  return { before, after, text: [text] };
}

/** Fresh collect() target with an empty include map (no partials resolve). */
function target() {
  return {
    pages: new Map(),
    unmapped: [],
    deletedPages: new Set(),
    includerMap: { byPath: new Map(), byBasename: new Map() },
  };
}

/** A parseDiff entry for one changed file. */
function entry(file, overrides = {}) {
  return {
    file,
    status: 'modified',
    addedLines: [],
    added: 0,
    removed: 0,
    deletions: [],
    ...overrides,
  };
}

test('resolveBaseRef falls back to the default branch for a ref that is gone', () => {
  // A stacked pull request's base branch is deleted the moment the one below it
  // merges, and the event payload still names it.
  assert.equal(resolveBaseRef('origin/branch-that-does-not-exist'), 'origin/main');
  assert.equal(resolveBaseRef('HEAD'), 'HEAD');
});

test('baseScopeSkipReason stays quiet when the base branch changed nothing', () => {
  // Every pull request against v24/v25.x reaches this now that previews are no
  // longer limited to main; there is nothing to explain if nothing diverged.
  assert.equal(baseScopeSkipReason('v25.1', 0), null);
  assert.equal(baseScopeSkipReason('docs/some-feature', 0), null);
});

test('baseFanOutSkipReason bounds what one changed shared file can reach', () => {
  // _styling-section-theming-props.adoc is included by 116 pages, so a base
  // branch changing that single file passes the file-count pre-check.
  assert.equal(baseFanOutSkipReason('stacked-parent', 50), null);
  assert.match(baseFanOutSkipReason('stacked-parent', 116), /reaches 116 pages/);
});

test('baseScopeSkipReason recognizes a maintenance branch by name', () => {
  for (const label of ['v24', 'v25.1', '25.2', 'v7']) {
    assert.match(baseScopeSkipReason(label, 1), /maintenance branch/, label);
  }
});

test('baseScopeSkipReason judges other branches by size, not by age', () => {
  // A branch can fork off a months-old commit and still be a perfectly good
  // stacked parent, so only its size decides.
  assert.equal(baseScopeSkipReason('25.2/ai-orchestrator', 13), null);
  assert.equal(baseScopeSkipReason('docs/some-feature', 50), null);
  assert.match(baseScopeSkipReason('control-center/2.0', 71), /changes 71 files/);
});

test('mergeScopes deduplicates within each scope', () => {
  const merged = mergeScopes(
    page({
      needles: ['same own needle', 'same own needle'],
      deletions: [deletion('gone'), deletion('gone')],
      baseNeedles: ['same base needle', 'same base needle'],
      baseDeletions: [deletion('base gone'), deletion('base gone')],
    })
  );
  assert.deepEqual(merged.needles, ['same own needle']);
  assert.equal(merged.deletions.length, 1);
  assert.deepEqual(merged.baseNeedles, ['same base needle']);
  assert.equal(merged.baseDeletions.length, 1);
});

test('mergeScopes keeps a change made by both scopes as this PR own', () => {
  // Otherwise a change this PR makes would render blue and read as someone
  // else's work.
  const shared = deletion('removed by both');
  const merged = mergeScopes(
    page({
      needles: ['shared paragraph text'],
      deletions: [shared],
      baseNeedles: ['shared paragraph text', 'base only text'],
      baseDeletions: [deletion('removed by both'), deletion('removed by base only')],
    })
  );
  assert.deepEqual(merged.needles, ['shared paragraph text']);
  assert.deepEqual(merged.baseNeedles, ['base only text']);
  assert.equal(merged.deletions.length, 1);
  assert.deepEqual(
    merged.baseDeletions.map((d) => d.text[0]),
    ['removed by base only']
  );
});

test('dedupeDeletions keeps records that differ only in their anchors', () => {
  const out = dedupeDeletions([
    deletion('gone', 'first anchor'),
    deletion('gone', 'second anchor'),
    deletion('gone', 'first anchor'),
  ]);
  assert.equal(out.length, 2);
});

test('buildComment caps the changed-page list and says how many it dropped', () => {
  const pages = Array.from({ length: 199 }, (_, i) => page({ path: `page-${i}` }));
  const comment = buildComment(pages, [], 'main', null);
  const listed = comment.split('\n').filter((line) => line.startsWith('- [')).length;
  assert.equal(listed, 150);
  assert.match(comment, /- … and 49 more pages/);
});

test('buildComment caps the base-branch and other-files lists', () => {
  const pages = [
    page(),
    ...Array.from({ length: 30 }, (_, i) => page({ path: `base-${i}`, status: null })),
  ];
  const unmapped = Array.from({ length: 60 }, (_, i) => ({
    file: `src/Example${i}.java`,
    status: 'modified',
  }));
  const comment = buildComment(pages, unmapped, 'stacked-parent', null);
  assert.match(comment, /- … and 5 more pages/);
  assert.match(comment, /- … and 10 more files/);
  assert.match(comment, /These come from `stacked-parent`/);
});

test('buildComment reports base branch changes that were left unmarked', () => {
  const comment = buildComment([page()], [], 'v25.1', 'v25.1 is a maintenance branch');
  assert.match(comment, /Not marked in the preview: v25\.1 is a maintenance branch/);
});

test('buildComment stays within what GitHub accepts', () => {
  const pages = Array.from({ length: 400 }, (_, i) =>
    page({ path: `deeply/nested/section/with/a/long/path/page-${i}` })
  );
  const comment = buildComment(pages, [], 'main', null);
  assert.ok(comment.length <= MAX_COMMENT_LENGTH, `comment was ${comment.length} characters`);
});

test('capCommentLength truncates only when over the limit, keeping the footer', () => {
  assert.equal(capCommentLength('short body'), 'short body');
  const capped = capCommentLength('x'.repeat(MAX_COMMENT_LENGTH + 1000), '\n_Built from abc_\n');
  assert.ok(capped.length <= MAX_COMMENT_LENGTH);
  assert.match(capped, /Listing truncated/);
  // The build the comment refers to has to survive the trimming.
  assert.match(capped, /_Built from abc_/);
});

test('collect keeps the base scope out of the own fields of a shared page', () => {
  const t = target();
  collect(
    [
      entry('articles/components/button/index.adoc', {
        addedLines: ['A paragraph this pull request adds to the button page.'],
        added: 1,
      }),
    ],
    'own',
    t
  );
  collect(
    [
      entry('articles/components/button/index.adoc', {
        addedLines: ['A paragraph the base branch adds to the button page.'],
        added: 5,
        removed: 3,
        deletions: [
          {
            removed: ['A paragraph the base branch removed from the button page.'],
            beforeLines: ['A surviving paragraph just above it.'],
            afterLines: [],
          },
        ],
      }),
    ],
    'base',
    t
  );

  const page = t.pages.get('components/button');
  assert.equal(page.status, 'modified');
  // Line counts and removal markers belong to the pull request alone.
  assert.equal(page.added, 1);
  assert.equal(page.removed, 0);
  assert.equal(page.deletions.length, 0);
  assert.equal(page.baseDeletions.length, 1);
  assert.ok(page.needles.some((n) => n.includes('this pull request adds')));
  assert.ok(!page.needles.some((n) => n.includes('the base branch adds')));
  assert.ok(page.baseNeedles.some((n) => n.includes('the base branch adds')));
});

test('collect gives a page only the base branch changed a null status', () => {
  const t = target();
  collect(
    [
      entry('articles/flow/routing/index.adoc', {
        addedLines: ['A paragraph only the base branch adds to the routing page.'],
        added: 1,
      }),
    ],
    'base',
    t
  );

  const page = t.pages.get('flow/routing');
  assert.equal(page.status, null);
  assert.equal(page.added, 0);
  assert.deepEqual(page.needles, []);
  assert.ok(page.baseNeedles.length > 0);
  assert.deepEqual(t.unmapped, []);
});

test('collect lets neither scope overwrite what the other recorded', () => {
  const t = target();
  collect(
    [
      entry('articles/components/badge/index.adoc', {
        status: 'added',
        addedLines: ['A brand new page introduced by this pull request.'],
      }),
      entry('articles/removed-page/index.adoc', { status: 'deleted' }),
      entry('articles/_own-partial.adoc', {
        addedLines: ['Text in a partial that nothing includes.'],
      }),
    ],
    'own',
    t
  );
  collect(
    [
      entry('articles/components/badge/index.adoc', {
        addedLines: ['A line the base branch adds to that same new page.'],
      }),
      entry('articles/base-removed-page/index.adoc', { status: 'deleted' }),
      entry('articles/_base-partial.adoc', {
        addedLines: ['Text in another partial that nothing includes.'],
      }),
    ],
    'base',
    t
  );

  assert.equal(t.pages.get('components/badge').status, 'added');
  // Only the own scope reports files that couldn't be mapped to a page.
  assert.deepEqual(
    t.unmapped.map((u) => u.file),
    ['articles/removed-page/index.adoc', 'articles/_own-partial.adoc']
  );
});

test('finalizePages drops a base-only page with nothing to show', () => {
  const t = target();
  collect(
    [
      entry('articles/flow/index.adoc', {
        addedLines: ['A real paragraph added by the base branch.'],
      }),
      // An added AsciiDoc attribute registers the page but yields no needle, so
      // there would be nothing to highlight on it.
      entry('articles/attribute-only/index.adoc', { addedLines: [':toc-title: Contents'] }),
    ],
    'base',
    t
  );

  assert.equal(t.pages.size, 2);
  assert.deepEqual(
    finalizePages(t.pages).map((page) => page.path),
    ['flow']
  );
});

test('buildComment reports blue highlights on a page this PR also changed', () => {
  // The base branch's changes don't have to land on a page of their own; when
  // they share a page with this PR's, the comment still has to explain the blue.
  const comment = buildComment(
    [page({ needles: ['own paragraph text'], baseNeedles: ['inherited paragraph text'] })],
    [],
    'stacked-parent',
    null
  );
  assert.match(comment, /highlighted in blue/);
  assert.match(comment, /also changed by the base branch/);
});

test('collect ignores a base branch change to a page this PR deletes', () => {
  // The preview doesn't serve the page any more, so listing it as changed by
  // the base branch would link to a page that 404s.
  const t = target();
  collect([entry('articles/components/accordion/index.adoc', { status: 'deleted' })], 'own', t);
  collect(
    [
      entry('articles/components/accordion/index.adoc', {
        addedLines: ['A paragraph the base branch adds to the doomed page.'],
      }),
    ],
    'base',
    t
  );

  assert.equal(t.pages.size, 0);
  assert.deepEqual(
    t.unmapped.map((u) => u.status),
    ['deleted']
  );
});

test('collect ignores shared content resolving onto a page this PR deletes', () => {
  const t = target();
  t.includerMap.byPath.set(
    'articles/_shared.adoc',
    new Set(['articles/kept/index.adoc', 'articles/dropped/index.adoc'])
  );
  collect([entry('articles/dropped/index.adoc', { status: 'deleted' })], 'own', t);
  collect(
    [entry('articles/_shared.adoc', { addedLines: ['A shared paragraph the base branch adds.'] })],
    'base',
    t
  );

  assert.deepEqual([...t.pages.keys()], ['kept']);
});
