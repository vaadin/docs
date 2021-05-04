import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement, customElement } from 'lit-element';
import '@vaadin/vaadin-button/vaadin-button';
import { applyTheme } from 'Frontend/generated/theme';
import * as img from '../../../../src/main/resources/images/vaadin-logo-dark.png';

@customElement('button-images')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-button theme="icon">
        <img src="${img}" width="100" alt="Vaadin logo" />
      </vaadin-button>
      <!-- end::snippet[] -->
    `;
  }
}
