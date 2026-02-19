import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/checkbox';
import '@vaadin/checkbox-group';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/demo/theme';

@customElement('checkbox-horizontal')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    applyTheme(root);
    return root;
  }

  protected override render() {
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
