import 'Frontend/demo/init'; // hidden-source-line

import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import '@vaadin/accordion';
import '@vaadin/text-field';
import '@vaadin/vertical-layout';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('accordion-content')
export class Example extends LitElement {
  static override styles = css`
    a {
      text-decoration: none;
      color: var(--lumo-primary-text-color);
    }
  `;

  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  protected override render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-accordion>
        <vaadin-accordion-panel summary="Analytics">
          <vaadin-vertical-layout>
            <a href="#">Dashboard</a>
            <a href="#">Reports</a>
            <a href="#">Data sources</a>
          </vaadin-vertical-layout>
        </vaadin-accordion-panel>
        <!-- end::snippet[] -->

        <vaadin-accordion-panel summary="Customers">
          <vaadin-vertical-layout>
            <a href="#">Accounts</a>
            <a href="#">Contacts</a>
          </vaadin-vertical-layout>
        </vaadin-accordion-panel>

        <vaadin-accordion-panel summary="Finances">
          <vaadin-vertical-layout>
            <a href="#">Invoices</a>
            <a href="#">Transactions</a>
            <a href="#">Statements</a>
          </vaadin-vertical-layout>
        </vaadin-accordion-panel>
        <!-- tag::snippet[] -->
      </vaadin-accordion>
      <!-- end::snippet[] -->
    `;
  }
}
