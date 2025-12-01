// Legacy Polymer-based dom-module styling
import './init-flow-namespace';
import './init-flow-components';
import '../generated/activate-vaadin-featureflags.js';
import '../generated/vaadin-featureflags';
import { applyTheme } from 'Frontend/demo/theme';
import client from 'Frontend/generated/connect-client.default';

// Some Vaadin components add elements to document.body that require theme styles
// (e.g. Dialog). Such components are embedded via iframes, but the same examples
// can also be opened as standalone pages. To support both cases, apply the theme
// to the document when the example runs in an iframe or standalone. This is safe
// because in those modes the styles are isolated from the rest of the site.
if (window.location.pathname.endsWith('/example')) {
  applyTheme(document);
}

// @ts-expect-error Inserted by DS Publisher
client.prefix = __VAADIN_CONNECT_PREFIX__; // eslint-disable-line no-undef

// Ensures standalone UI sample pags have a lang attribute
document.documentElement.setAttribute('lang', 'en');

// Applies input field borders based on a `borders` URL parameter
const url = new URL(window.location.href);
if (url.searchParams.has('borders')) {
  document.body.style.setProperty('--vaadin-input-field-border-width', '1px');
}
