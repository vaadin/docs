import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/checkbox';
import '@vaadin/checkbox-group';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/demo/theme';

@customElement('checkbox-disabled')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    applyTheme(root);
    return root;
  }

  protected override render() {
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
