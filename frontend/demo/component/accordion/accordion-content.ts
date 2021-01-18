import '../../init'; // hidden-full-source-line

import { html, LitElement, customElement, css } from 'lit-element';
import '@vaadin/vaadin-accordion/vaadin-accordion';
import '@vaadin/vaadin-ordered-layout/vaadin-vertical-layout';
import '@vaadin/vaadin-text-field/vaadin-text-field';

// tag::snippet[]
@customElement('accordion-content')
export class Example extends LitElement {
  static get styles() {
    return css`
      a {
        text-decoration: none;
        color: var(--lumo-primary-text-color);
      }
    `;
  }
  render() {
    return html`
      <vaadin-accordion>
        <vaadin-accordion-panel>
          <div slot="summary">Analytics</div>

          <vaadin-vertical-layout>
            <a href="#">Dashboard</a>
            <a href="#">Reports</a>
            <a href="#">Data sources</a>
          </vaadin-vertical-layout>
        </vaadin-accordion-panel>

        <vaadin-accordion-panel>
          <div slot="summary">Customers</div>

          <vaadin-vertical-layout>
            <a href="#">Accounts</a>
            <a href="#">Contacts</a>
          </vaadin-vertical-layout>
        </vaadin-accordion-panel>

        <vaadin-accordion-panel>
          <div slot="summary">Finances</div>

          <vaadin-vertical-layout>
            <a href="#">Invoices</a>
            <a href="#">Transactions</a>
            <a href="#">Statements</a>
          </vaadin-vertical-layout>
        </vaadin-accordion-panel>
      </vaadin-accordion>
    `;
  }
}
// end::snippet[]
