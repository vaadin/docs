import '../../init'; // hidden-full-source-line

import { html, css, LitElement, customElement } from 'lit-element';
import '@vaadin/vaadin-ordered-layout/vaadin-scroller';
import '@vaadin/vaadin-ordered-layout/vaadin-horizontal-layout';
import '@vaadin/vaadin-button/vaadin-button';
import '@vaadin/vaadin-icons/vaadin-icons';
import '@vaadin/vaadin-lumo-styles/icons';

@customElement('scroller-basic')
export class Example extends LitElement {
  static get styles() {
    return css`
      #header {
        font-family: var(--lumo-font-family);
        font-size: var(--lumo-font-size-l);
      }
    `;
  }

  render() {
    return html`
      <p id="header">Create new...</p>

      <!-- tag::snippet[] -->
      <vaadin-scroller
        scroll-direction="horizontal"
        style="width: 300px; padding: var(--lumo-space-m);"
      >
        <vaadin-horizontal-layout theme="spacing" style="width: max-content;">
          <vaadin-button style="height: 100px;">
            <iron-icon icon="vaadin:clipboard-check" slot="prefix"></iron-icon>
            Audit
          </vaadin-button>
          <vaadin-button style="height: 100px;">
            <iron-icon icon="vaadin:book-dollar" slot="prefix"></iron-icon>
            Report
          </vaadin-button>
          <vaadin-button style="height: 100px;">
            <iron-icon icon="vaadin:line-chart" slot="prefix"></iron-icon>
            Dashboard
          </vaadin-button>
          <vaadin-button style="height: 100px;">
            <iron-icon icon="vaadin:invoice" slot="prefix"></iron-icon>
            Invoice
          </vaadin-button>
        </vaadin-horizontal-layout>
      </vaadin-scroller>
      <!-- end::snippet[] -->
    `;
  }
}
