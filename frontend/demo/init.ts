// Legacy Polymer-based dom-module styling
import './init-flow-namespace';
import './init-flow-components';
import '../generated/activate-vaadin-featureflags.js';
import '../generated/vaadin-featureflags';
import client from 'Frontend/generated/connect-client.default';

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
