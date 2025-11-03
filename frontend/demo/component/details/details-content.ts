import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/details';
import '@vaadin/vertical-layout';
import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/demo/theme';

@customElement('details-content')
export class Example extends LitElement {
  static override styles = css`
    a {
      text-decoration: none;
      color: var(--lumo-primary-text-color);
    }
  `;

  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    applyTheme(root);
    return root;
  }

  protected override render() {
    // tag::snippet[]
    return html`
      <vaadin-details summary="Analytics" opened>
        <vaadin-vertical-layout>
          <a href="#">Dashboard</a>
          <a href="#">Reports</a>
          <a href="#">Data sources</a>
        </vaadin-vertical-layout>
      </vaadin-details>

      <vaadin-details summary="Customers" opened>
        <vaadin-vertical-layout>
          <a href="#">Accounts</a>
          <a href="#">Contacts</a>
        </vaadin-vertical-layout>
      </vaadin-details>

      <vaadin-details summary="Finances" opened>
        <vaadin-vertical-layout>
          <a href="#">Invoices</a>
          <a href="#">Transactions</a>
          <a href="#">Statements</a>
        </vaadin-vertical-layout>
      </vaadin-details>
    `;
    // end::snippet[]
  }
}
