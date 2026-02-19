import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/checkbox';
import '@vaadin/checkbox-group';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/demo/theme';

@customElement('checkbox-vertical')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    applyTheme(root);
    return root;
  }

  protected override render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-checkbox-group label="Working days" theme="vertical">
        <vaadin-checkbox value="mon" label="Monday"></vaadin-checkbox>
        <vaadin-checkbox value="tue" label="Tuesday"></vaadin-checkbox>
        <vaadin-checkbox value="wed" label="Wednesday"></vaadin-checkbox>
        <vaadin-checkbox value="thu" label="Thursday"></vaadin-checkbox>
        <vaadin-checkbox value="fri" label="Friday"></vaadin-checkbox>
        <vaadin-checkbox value="sat" label="Saturday"></vaadin-checkbox>
        <vaadin-checkbox value="sun" label="Sunday"></vaadin-checkbox>
      </vaadin-checkbox-group>
      <!-- end::snippet[] -->
    `;
  }
}
