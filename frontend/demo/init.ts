// Legacy Polymer-based dom-module styling
import '@vaadin/polymer-legacy-adapter/style-modules.js';
import './init-flow-namespace';
import './init-flow-components';
import '../generated/vaadin-featureflags';
import '../generated/theme-docs.global.generated.js';
import client from 'Frontend/generated/connect-client.default';
import { applyTheme } from 'Frontend/generated/theme';

// Fix feature flags
// Since https://github.com/vaadin/flow/pull/21066 Flow sets feature flags at runtime. However, that
// doesn't work when rendering only Lit / React examples, as the Flow bootstrap logic is never
// loaded. So for now, feature flags are set here in addition to vaadin-featureflags.properties.
window.Vaadin.featureFlags = {
  ...window.Vaadin.featureFlags,
  cardComponent: true,
  dashboardComponent: true,
};

// Apply the theme, so that overlay elements styles and custom property overrides work as expected
applyTheme(document);

// @ts-expect-error Inserted by DS Publisher
client.prefix = __VAADIN_CONNECT_PREFIX__; // eslint-disable-line no-undef

document.body.style.setProperty('--docs-example-render-font-family', 'var(--lumo-font-family)');
document.body.style.setProperty('--docs-example-render-color', 'var(--lumo-body-text-color)');
document.body.style.setProperty('--docs-example-render-background-color', 'var(--lumo-base-color)');

// Ensures standalone UI sample pags have a lang attribute
document.documentElement.setAttribute('lang', 'en');

// Applies input field borders based on a `borders` URL parameter
const url = new URL(window.location.href);
if (url.searchParams.has('borders')) {
  document.body.style.setProperty('--vaadin-input-field-border-width', '1px');
}
