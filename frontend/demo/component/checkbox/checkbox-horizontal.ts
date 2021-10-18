import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import '@vaadin/checkbox';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('checkbox-horizontal')
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
      <vaadin-checkbox-group label="Permissions">
        <vaadin-checkbox value="read" label="Read"></vaadin-checkbox>
        <vaadin-checkbox value="edit" label="Edit"></vaadin-checkbox>
        <vaadin-checkbox value="delete" label="Delete"></vaadin-checkbox>
      </vaadin-checkbox-group>
      <!-- end::snippet[] -->
    `;
  }
}
