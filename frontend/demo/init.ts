// Legacy Polymer-based dom-module styling
import './init-flow-namespace';
import './init-flow-components';
import '../generated/activate-vaadin-featureflags.js';
import '../generated/vaadin-featureflags';
import client from 'Frontend/generated/connect-client.default';

// @ts-expect-error Inserted by DS Publisher
client.prefix = __VAADIN_CONNECT_PREFIX__; // eslint-disable-line no-undef

// TODO: These props are not defined in global scope and we don't want to load the whole theme into
// the global styles. Needs checking whether / when these are actually needed.
// document.body.style.setProperty('--docs-example-render-font-family', 'var(--aura-font-family)');
// document.body.style.setProperty('--docs-example-render-color', 'var(--vaadin-text-color)');

// Ensures standalone UI sample pags have a lang attribute
document.documentElement.setAttribute('lang', 'en');

// Applies input field borders based on a `borders` URL parameter
const url = new URL(window.location.href);
if (url.searchParams.has('borders')) {
  document.body.style.setProperty('--vaadin-input-field-border-width', '1px');
}
