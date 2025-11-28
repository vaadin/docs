// Legacy Polymer-based dom-module styling
import './init-flow-namespace';
import './init-flow-components';
import '../generated/activate-vaadin-featureflags.js';
import '../generated/vaadin-featureflags';
import { applyTheme } from 'Frontend/demo/theme';
import client from 'Frontend/generated/connect-client.default';

// Apply the theme to the document when example is rendered as a standalone page
const searchParams = new URLSearchParams(window.location.search);
if (searchParams.has('example-theme')) {
  applyTheme(document);
}

// @ts-expect-error Inserted by DS Publisher
client.prefix = __VAADIN_CONNECT_PREFIX__; // eslint-disable-line no-undef

// document.body.style.setProperty('--docs-example-render-font-family', 'var(--lumo-font-family)');
// document.body.style.setProperty('--docs-example-render-color', 'var(--lumo-body-text-color)');
// document.body.style.setProperty('--docs-example-render-background-color', 'var(--lumo-base-color)');

// Ensures standalone UI sample pags have a lang attribute
document.documentElement.setAttribute('lang', 'en');

// Applies input field borders based on a `borders` URL parameter
if (searchParams.has('borders')) {
  document.body.style.setProperty('--vaadin-input-field-border-width', '1px');
}
