import './init-flow-namespace';
import 'all-flow-imports-or-empty';
// See webpack.config 'externals.generated/theme'
// This file ends up in the docs-app bundle
import { applyTheme } from 'generated/theme';
// @ts-ignore
window.__applyTheme = { applyTheme };
