import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import '@vaadin/icon';
import '@vaadin/icons';
import '@vaadin/text-field';
import '@vaadin/tooltip';
import '@vaadin/vaadin-lumo-styles/vaadin-iconset.js';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('tooltip-manual')
export class Example extends LitElement {
  protected createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  @property({ type: Boolean })
  private tooltipOpened = false;

  render() {
    return html`
      <vaadin-text-field placeholder="Search">
        <vaadin-icon slot="prefix" icon="lumo:search"></vaadin-icon>
        <!-- tag::snippet[] -->
        <vaadin-tooltip
          slot="tooltip"
          text="Wrap in “quotes” for exact phrase"
          manual
          .opened="${this.tooltipOpened}"
        ></vaadin-tooltip>
        <vaadin-button
          slot="suffix"
          theme="tertiary-inline icon"
          @click="${() => (this.tooltipOpened = !this.tooltipOpened)}"
        >
          <vaadin-icon icon="vaadin:info-circle"></vaadin-icon>
        </vaadin-button>
        <!-- end::snippet[] -->
      </vaadin-text-field>
    `;
  }
}
