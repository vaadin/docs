import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/checkbox';
import '@vaadin/checkbox-group';
import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/demo/theme';

@customElement('checkbox-group-readonly')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    applyTheme(root);
    return root;
  }

  @state()
  private value = ['0', '2'];

  protected override render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-checkbox-group label="Export data" .value="${this.value}" readonly theme="vertical">
        <vaadin-checkbox value="0" label="Order ID"></vaadin-checkbox>
        <vaadin-checkbox value="1" label="Product name"></vaadin-checkbox>
        <vaadin-checkbox value="2" label="Customer"></vaadin-checkbox>
        <vaadin-checkbox value="3" label="Status"></vaadin-checkbox>
      </vaadin-checkbox-group>
      <!-- end::snippet[] -->
    `;
  }
}
