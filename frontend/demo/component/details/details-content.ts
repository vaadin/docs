import '../../init'; // hidden-full-source-line

import { html, LitElement, customElement, css } from 'lit-element';
import '@vaadin/vaadin-details/vaadin-details';
import '@vaadin/vaadin-ordered-layout/vaadin-vertical-layout';

// tag::snippet[]
@customElement('details-content')
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
      <vaadin-details opened>
        <div slot="summary">Analytics</div>

        <vaadin-vertical-layout>
          <a href="#">Dashboard</a>
          <a href="#">Reports</a>
          <a href="#">Data sources</a>
        </vaadin-vertical-layout>
      </vaadin-details>

      <vaadin-details opened>
        <div slot="summary">Customers</div>

        <vaadin-vertical-layout>
          <a href="#">Accounts</a>
          <a href="#">Contacts</a>
        </vaadin-vertical-layout>
      </vaadin-details>

      <vaadin-details opened>
        <div slot="summary">Finances</div>

        <vaadin-vertical-layout>
          <a href="#">Invoices</a>
          <a href="#">Transactions</a>
          <a href="#">Statements</a>
        </vaadin-vertical-layout>
      </vaadin-details>
    `;
  }
}
// end::snippet[]
