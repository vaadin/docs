/**
 * Checks that preview-only behaviour is really gated on the preview build flag.
 *
 * dspublisher/theme/init-browser.ts suppresses the HaaS cookie dialog by writing
 * a `privacyPolicy=-1` cookie, but only on preview deployments. The production
 * site must never write it: that would silently decline consent for every
 * visitor and hide the dialog. The gate is the `__DOCS_PREVIEW_DIFF__` define
 * from vite.dspublisher.ts, set only when DOCS_PREVIEW_DIFF=true (Dockerfile.preview).
 *
 * Bundles the theme entry point twice, once with the flag on and once off, and
 * fails if the cookie opt-out is missing from the preview bundle or present in
 * the production one. Exits with a non-zero status on either.
 *
 * Usage:
 *   node scripts/check-preview-flag-gating.mjs
 */
import { build } from 'vite';

const ENTRY = 'dspublisher/theme/init-browser.ts';
// The opt-out is dead code behind `if (false)` in a production build, so the
// bundle is minified to let the minifier drop it before this string is looked for.
const OPT_OUT = 'privacyPolicy=-1';

async function bundle(previewFlag) {
  const result = await build({
    configFile: false,
    logLevel: 'silent',
    define: { __DOCS_PREVIEW_DIFF__: JSON.stringify(previewFlag) },
    build: {
      write: false,
      minify: true,
      lib: { entry: ENTRY, formats: ['es'], fileName: 'init-browser' },
      // Only this file's own code matters here; leave dependencies unbundled.
      rollupOptions: { external: (id) => !id.startsWith('.') && !id.startsWith('/') },
    },
  });

  const chunks = Array.isArray(result) ? result : [result];
  return chunks
    .flatMap((chunk) => chunk.output)
    .map((output) => output.code ?? '')
    .join('\n');
}

const previewBundle = await bundle(true);
const productionBundle = await bundle(false);

let failures = 0;

if (previewBundle.includes(OPT_OUT)) {
  console.log('OK   preview build (DOCS_PREVIEW_DIFF=true): cookie opt-out present');
} else {
  failures++;
  console.error('FAIL preview build (DOCS_PREVIEW_DIFF=true): cookie opt-out missing');
}

if (productionBundle.includes(OPT_OUT)) {
  failures++;
  console.error(
    'FAIL production build: cookie opt-out present, which would decline consent for ' +
      'every visitor of the live site'
  );
} else {
  console.log('OK   production build: cookie opt-out absent');
}

if (failures > 0) {
  process.exit(1);
}

console.log('\nPreview-only behaviour is gated on __DOCS_PREVIEW_DIFF__.');
