import { registerStyles, css, unsafeCSS } from '@vaadin/vaadin-themable-mixin/register-styles.js';
import * as img from '../../../../src/main/resources/images/starry-sky.png';

//tag::snippet[]
registerStyles(
  'vaadin-login-overlay-wrapper',
  css`
    :host([theme='header-customised']) [part='brand'] {
      background-size: cover;
      background-position: center;
      background-image: url(${unsafeCSS(img)})
    }

    :host([theme='header-customised']) ::slotted(.title) {
      color: var(--lumo-primary-contrast-color) !important;
      font-weight: 600 !important;
      margin-top: var(--lumo-space-m) !important;
      margin-bottom: var(--lumo-space-xs) !important;
    }

    :host([theme='header-customised']) ::slotted(span) {
      color: var(--lumo-primary-contrast-color) !important;
    }
  }`
);
//end::snippet[]
