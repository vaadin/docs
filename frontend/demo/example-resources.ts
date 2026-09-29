import './init-flow-namespace';
// Flow loads its browser helpers, such as ElementResize, only through the regular
// application bootstrap and not through the embedded web component bootstrap that
// renders the Flow examples. Load the element resize helper here so that
// Element.sizeSignal() works in the examples.
import 'Frontend/generated/jar-resources/ElementResize.js';
import { applyTheme } from 'Frontend/demo/theme';
// Expose function to inject styles into shadow roots to web components exported from Flow.
// See Flow application Vite config (apply-docs-theme plugin)
// This file ends up in the DSP bundle
// @ts-expect-error See vite.config.ts
window.__applyTheme = { applyTheme };
// @ts-expect-error See webpack.dspublisher.js
import('all-flow-imports-or-empty').catch(() => {});

// Verify if session is still active and reload the page otherwise
import './session-verification';
