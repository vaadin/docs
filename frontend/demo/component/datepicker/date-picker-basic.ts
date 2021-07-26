import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import '@vaadin/vaadin-date-picker/vaadin-date-picker';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('date-picker-basic')
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
      <vaadin-date-picker label="Start date"></vaadin-date-picker>
      <!-- end::snippet[] -->
    `;
  }
}
