import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/tabs';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/demo/theme';

@customElement('tabs-states')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    applyTheme(root);
    return root;
  }

  protected override render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-tabs>
        <vaadin-tab>Selected</vaadin-tab>
        <vaadin-tab>Unselected</vaadin-tab>
        <vaadin-tab disabled>Disabled</vaadin-tab>
      </vaadin-tabs>
      <!-- end::snippet[] -->
    `;
  }
}
