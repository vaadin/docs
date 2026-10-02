import './init-flow-namespace';
// Temporary workaround for https://github.com/vaadin/flow/issues/26041
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
