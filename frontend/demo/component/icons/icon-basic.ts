import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/horizontal-layout';
import '@vaadin/icon';
import '@vaadin/icons';
import '@vaadin/vaadin-lumo-styles/vaadin-iconset.js';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/demo/theme';

@customElement('icon-basic')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    applyTheme(root);
    return root;
  }

  protected override render() {
    return html`
      <vaadin-horizontal-layout theme="spacing" style="align-items: center">
        <!-- tag::snippet[] -->
        <vaadin-icon icon="lumo:photo"></vaadin-icon>
        <vaadin-icon icon="vaadin:phone"></vaadin-icon>
        <!-- end::snippet[] -->
      </vaadin-horizontal-layout>
    `;
  }
}
