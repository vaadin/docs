import './init-flow-namespace';
import { applyTheme } from 'generated/theme';
// See webpack.config 'externals.generated/theme'
// This file ends up in the docs-app bundle
// @ts-ignore
window.__applyTheme = { applyTheme };
// @ts-ignore
import('all-flow-imports-or-empty').catch(() => {});
