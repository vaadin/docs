import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/dashboard/vaadin-dashboard.js'; // hidden-source-line
import '@vaadin/dashboard/vaadin-dashboard-layout.js';
import '@vaadin/dashboard/vaadin-dashboard-widget.js';
import { html, LitElement } from 'lit';
import { state } from 'lit/decorators.js';
import type { DashboardItem, DashboardItemBeforeRemoveEvent } from '@vaadin/dashboard';

export class Example extends LitElement {
  @state()
  items: DashboardItem[] = [
    /* Item definitions */
  ];

  @state()
  itemToRemove: DashboardItem | null = null;

  // tag::snippet[]
  private handleItemBeforeRemove(event: DashboardItemBeforeRemoveEvent<DashboardItem>) {
    event.preventDefault();
    this.itemToRemove = event.detail.item;
  }

  private handleRemoveConfirm() {
    this.items = this.items.filter((item) => item !== this.itemToRemove);
    this.itemToRemove = null;
  }

  private handleRemoveCancel() {
    this.itemToRemove = null;
  }

  render() {
    return html`
      <vaadin-dashboard
        .items="${this.items}"
        @dashboard-item-before-remove="${this.handleItemBeforeRemove}"
      >
      </vaadin-dashboard>
      <vaadin-confirm-dialog
        header="Confirm removal"
        cancel-button-visible
        @confirm="${this.handleRemoveConfirm}"
        @cancel="${this.handleRemoveCancel}"
        .opened="${this.itemToRemove !== null}"
      >
        Are you sure you want to remove this item?
      </vaadin-confirm-dialog>
    `;
  }
  // end::snippet[]
}
