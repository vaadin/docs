import './init-flow-namespace';
import './init-flow-components';

// @ts-ignore
import { applyTheme } from 'Frontend/generated/theme';

// Apply the theme, so that overlay elements styles and custom property overrides work as expected
applyTheme(document);

document.body.style.setProperty('--docs-example-render-font-family', 'var(--lumo-font-family)');
document.body.style.setProperty('--docs-example-render-color', 'var(--lumo-body-text-color)');
document.body.style.setProperty('--docs-example-render-background-color', 'var(--lumo-base-color)');
