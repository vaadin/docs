import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import '@vaadin/icon';
import '@vaadin/text-field';
import '@vaadin/tooltip';
import '@vaadin/vaadin-lumo-styles/vaadin-iconset.js';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('tooltip-basic')
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
      <vaadin-text-field placeholder="Search">
        <vaadin-icon slot="prefix" icon="lumo:search"></vaadin-icon>
        <vaadin-tooltip slot="tooltip" text="Wrap in “quotes” for exact phrase"></vaadin-tooltip>
      </vaadin-text-field>
      <!-- end::snippet[] -->
    `;
  }
}
