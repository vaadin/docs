import client from 'Frontend/generated/connect-client.default.js';
import { applyTheme } from 'Frontend/generated/theme.js';

// Apply the theme, so that overlay elements styles and custom property overrides work as expected
applyTheme(document);

// @ts-ignore
client.prefix = __VAADIN_CONNECT_PREFIX__;

document.body.style.setProperty('--docs-example-render-font-family', 'var(--lumo-font-family)');
document.body.style.setProperty('--docs-example-render-color', 'var(--lumo-body-text-color)');
document.body.style.setProperty('--docs-example-render-background-color', 'var(--lumo-base-color)');
