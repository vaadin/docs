import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/icon';
import '@vaadin/text-field';
import '@vaadin/tooltip';
import '@vaadin/vaadin-lumo-styles/vaadin-iconset.js';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/demo/theme';

@customElement('tooltip-basic')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    applyTheme(root);
    return root;
  }

  protected override render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-text-field placeholder="Search">
        <vaadin-icon slot="prefix" icon="lumo:search"></vaadin-icon>
        <vaadin-tooltip slot="tooltip" text="Wrap in “quotes” for exact phrase"></vaadin-tooltip>
      </vaadin-text-field>
      <!-- end::snippet[] -->
    `;
  }
}
