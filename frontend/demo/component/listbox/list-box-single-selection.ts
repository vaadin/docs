import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/item';
import '@vaadin/list-box';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/demo/theme';

@customElement('list-box-single-selection')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    applyTheme(root);
    return root;
  }

  protected override render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-list-box selected="0">
        <vaadin-item>In progress</vaadin-item>
        <vaadin-item>Done</vaadin-item>
        <vaadin-item>Cancelled</vaadin-item>
      </vaadin-list-box>
      <!-- end::snippet[] -->
    `;
  }
}
