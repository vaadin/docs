import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import '@vaadin/checkbox';
import '@vaadin/checkbox-group';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('checkbox-disabled')
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
      <vaadin-checkbox-group label="Departments" theme="vertical" disabled>
        <vaadin-checkbox value="engineering" label="Engineering"></vaadin-checkbox>
        <vaadin-checkbox value="human-resources" label="Human Resources"></vaadin-checkbox>
        <vaadin-checkbox value="marketing" label="Marketing"></vaadin-checkbox>
        <vaadin-checkbox value="operations" label="Operations"></vaadin-checkbox>
        <vaadin-checkbox value="sales" label="Sales"></vaadin-checkbox>
      </vaadin-checkbox-group>
      <!-- end::snippet[] -->
    `;
  }
}
