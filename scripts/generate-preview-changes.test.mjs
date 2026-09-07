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
  baseScopeSkipReason,
  buildComment,
  capCommentLength,
  dedupeDeletions,
  mergeScopes,
  resolveBaseRef,
} = await import('./generate-preview-changes.mjs');

const MAX_COMMENT_LENGTH = 65000;

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

test('resolveBaseRef falls back to the default branch for a ref that is gone', () => {
  // A stacked pull request's base branch is deleted the moment the one below it
  // merges, and the event payload still names it.
  assert.equal(resolveBaseRef('origin/branch-that-does-not-exist'), 'origin/main');
  assert.equal(resolveBaseRef('HEAD'), 'HEAD');
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

test('capCommentLength truncates only when over the limit', () => {
  assert.equal(capCommentLength('short body'), 'short body');
  const capped = capCommentLength('x'.repeat(MAX_COMMENT_LENGTH + 1000));
  assert.ok(capped.length <= MAX_COMMENT_LENGTH);
  assert.match(capped, /Listing truncated/);
});
