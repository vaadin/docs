/**
 * Unit tests for the comparison step of check-feature-flags.js: the git and
 * Maven plumbing is exercised by running the script itself, these tests only
 * cover how documented flags are matched against the flags found in the
 * Vaadin version the docs are pinned to.
 *
 * Run with `npm test` (or `node --test scripts/`) from the repository root.
 */
import assert from 'node:assert/strict';
import test from 'node:test';

const { compareFlags } = await import('./check-feature-flags.js');

test('flags in both the article and the release are in sync', () => {
  const { undocumented, stale } = compareFlags(new Set(['tailwindCss']), ['tailwindCss']);
  assert.deepEqual(undocumented, []);
  assert.deepEqual(stale, []);
});

test('a flag in the release but not in the article is undocumented', () => {
  const { undocumented, stale } = compareFlags(new Set(['tailwindCss']), [
    'tailwindCss',
    'aiComponents',
  ]);
  assert.deepEqual(undocumented, ['aiComponents']);
  assert.deepEqual(stale, []);
});

test('a flag removed from the release is stale in the article', () => {
  const { undocumented, stale } = compareFlags(new Set(['tailwindCss', 'goneFlag']), [
    'tailwindCss',
  ]);
  assert.deepEqual(undocumented, []);
  assert.deepEqual(stale, ['goneFlag']);
});

test('excluded flags are neither undocumented nor stale', () => {
  const { documented, stale } = compareFlags(
    new Set(['tailwindCss', 'copilotExperimentalFeatures']),
    ['tailwindCss']
  );
  assert.deepEqual(stale, []);
  assert.deepEqual([...documented], ['tailwindCss']);
});

// Regression test for vaadin/docs#6038: the docs for vaadin/flow#24484 document
// `ssePushTransport`, which is merged to the 25.3 line but is not part of the
// pinned 25.3.0-beta3 release yet. Documenting a flag ahead of the release that
// ships it must not be reported as stale.
test('a flag merged to the release line but not yet released is not stale', () => {
  const releasedFlags = ['tailwindCss'];
  const unreleasedFlags = ['ssePushTransport'];
  const { undocumented, stale } = compareFlags(
    new Set(['tailwindCss', 'ssePushTransport']),
    releasedFlags,
    unreleasedFlags
  );
  assert.deepEqual(undocumented, []);
  assert.deepEqual(stale, []);
});
