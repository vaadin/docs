import client from 'Frontend/generated/connect-client.default';
import { applyTheme } from 'Frontend/generated/theme';

// TODO: For some reason the feature flag for side-nav doesn't work. Need to enable manually.
window.Vaadin ||= {};
window.Vaadin.featureFlags ||= {};
window.Vaadin.featureFlags.sideNavComponent = true;

// Apply the theme, so that overlay elements styles and custom property overrides work as expected
applyTheme(document);

// @ts-ignore
client.prefix = __VAADIN_CONNECT_PREFIX__;

document.body.style.setProperty('--docs-example-render-font-family', 'var(--lumo-font-family)');
document.body.style.setProperty('--docs-example-render-color', 'var(--lumo-body-text-color)');
document.body.style.setProperty('--docs-example-render-background-color', 'var(--lumo-base-color)');
