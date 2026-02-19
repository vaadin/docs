import './init-flow-namespace';
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
