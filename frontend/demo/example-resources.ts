// See webpack.config 'externals.generated/theme'
// This file ends up in the docs-app bundle
import { applyTheme } from 'generated/theme';
// @ts-ignore
window.__applyTheme = { applyTheme };
