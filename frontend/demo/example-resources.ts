import './init-flow-namespace';
import { applyTheme } from 'Frontend/generated/theme';
// See Vite config 'apply-theme-fallback'
// This file ends up in the DSP bundle
// @ts-expect-error See vite.config.ts
window.__applyTheme = { applyTheme };
// @ts-expect-error See webpack.dspublisher.js
import('all-flow-imports-or-empty').catch(() => {});

// Verify if session is still active and reload the page otherwise
import './session-verification';
