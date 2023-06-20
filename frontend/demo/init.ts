// Legacy Polymer-based dom-module styling
import '@vaadin/polymer-legacy-adapter/style-modules.js';

import './init-flow-namespace';
import './init-flow-components';
import '../generated/vaadin-featureflags';
import client from 'Frontend/generated/connect-client.default';
import { applyTheme } from 'Frontend/generated/theme';

// Apply the theme, so that overlay elements styles and custom property overrides work as expected
applyTheme(document);

// @ts-expect-error Inserted by DS Publisher
client.prefix = __VAADIN_CONNECT_PREFIX__; // eslint-disable-line no-undef

document.body.style.setProperty('--docs-example-render-font-family', 'var(--lumo-font-family)');
document.body.style.setProperty('--docs-example-render-color', 'var(--lumo-body-text-color)');
document.body.style.setProperty('--docs-example-render-background-color', 'var(--lumo-base-color)');
