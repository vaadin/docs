import 'Frontend/demo/init'; // hidden-source-line

import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import '@vaadin/vaadin-details/vaadin-details';
import '@vaadin/vaadin-ordered-layout/vaadin-vertical-layout';
import { applyTheme } from 'Frontend/generated/theme';

// tag::snippet[]
@customElement('details-content')
export class Example extends LitElement {
  protected createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

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
