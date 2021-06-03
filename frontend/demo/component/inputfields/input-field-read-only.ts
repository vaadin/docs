import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import '@vaadin/vaadin-text-field';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('input-field-read-only')
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
      <vaadin-text-field label="Read-only" value="Value" readonly></vaadin-text-field>
      <!-- end::snippet[] -->
    `;
  }
}
