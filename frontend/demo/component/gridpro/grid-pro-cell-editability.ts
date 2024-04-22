import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '@vaadin/grid-pro';
import '@vaadin/grid-pro/vaadin-grid-pro-edit-column.js';
import type { GridItemModel } from '@vaadin/grid';
import { applyTheme } from 'Frontend/generated/theme';

type Transaction = {
  name: string;
  amount: number;
  approved: boolean;
};

@customElement('grid-pro-cell-editability')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  @state()
  private items: Transaction[] = [
    { name: 'Transaction 1', amount: 100, approved: true },
    { name: 'Transaction 2', amount: 200, approved: false },
  ];

  protected override render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-grid-pro .items="${this.items}">
        <vaadin-grid-pro-edit-column
          path="name"
          .isCellEditable="${this.isNotApproved}"
        ></vaadin-grid-pro-edit-column>
        <vaadin-grid-pro-edit-column
          path="amount"
          .isCellEditable="${this.isNotApproved}"
        ></vaadin-grid-pro-edit-column>
        <vaadin-grid-pro-edit-column
          path="approved"
          editor-type="checkbox"
        ></vaadin-grid-pro-edit-column>
      </vaadin-grid-pro>
      <!-- end::snippet[] -->
    `;
  }

  protected isNotApproved(model: GridItemModel<Transaction>) {
    return !model.item.approved;
  }
}
