import './init-flow-namespace';
import { applyTheme } from 'Frontend/generated/theme';
// See webpack.config 'externals.Frontend/generated/theme'
// This file ends up in the docs-app bundle
// @ts-ignore
window.__applyTheme = { applyTheme };
// @ts-ignore
import('all-flow-imports-or-empty').catch(() => {});

// Verify if session is still active and reload the page otherwise
import './session-verification';
