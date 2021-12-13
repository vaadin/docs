import 'Frontend/demo/init'; // hidden-source-line
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import '@vaadin/custom-field';
import '@vaadin/horizontal-layout';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('custom-field-native-input-whitespace-theme')
export class Example extends LitElement {
  protected createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-custom-field label="Coordinate" theme="whitespace">
        <vaadin-horizontal-layout theme="spacing">
          <input aria-label="Longitude" placeholder="Longitude" required type="text" />
          <input aria-label="Latitude" placeholder="Latitude" required type="text" />
        </vaadin-horizontal-layout>
      </vaadin-custom-field>
      <!-- end::snippet[] -->
    `;
  }
}
