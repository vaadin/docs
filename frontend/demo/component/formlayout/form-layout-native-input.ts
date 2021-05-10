import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement, customElement } from 'lit-element';
import '@vaadin/vaadin-form-layout/vaadin-form-layout';
import '@vaadin/vaadin-form-layout/vaadin-form-item';

import { applyTheme } from 'Frontend/generated/theme';

@customElement('form-layout-native-input')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-form-layout>
        <vaadin-form-item>
          <label slot="label">Revenue</label>
          <input type="text" />
        </vaadin-form-item>
      </vaadin-form-layout>
      <!-- end::snippet[] -->
    `;
  }
}
