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
  }`
);
//end::snippet[]
