import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement, render } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { guard } from 'lit/directives/guard.js';

import '@vaadin/button';
import '@vaadin/dialog';

import '@vaadin/grid';
import '@vaadin/grid/vaadin-grid-selection-column.js';

import { applyTheme } from 'Frontend/generated/theme';
import { getPeople } from 'Frontend/demo/domain/DataService';
import Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { GridColumn, GridItemModel } from '@vaadin/grid';

@customElement('dialog-no-padding')
export class Example extends LitElement {
  protected createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  @state()
  private dialogOpened = false;

  @state()
  private people?: Person[];

  async firstUpdated() {
    const { people } = await getPeople({ count: 50 });
    this.people = people;
  }

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-dialog
        theme="no-padding"
        header-title="Filter reports by users:"
        .opened="${this.dialogOpened}"
        @opened-changed="${(e: CustomEvent) => (this.dialogOpened = e.detail.value)}"
        .renderer="${guard([], () => (root: HTMLElement) => {
          render(
            html`
              <vaadin-grid .items="${this.people}" style="width: 500px; max-width: 100%;">
                <vaadin-grid-selection-column></vaadin-grid-selection-column>
                <vaadin-grid-column
                  header="Name"
                  .renderer="${(
                    root: HTMLElement,
                    _: GridColumn<Person>,
                    model: GridItemModel<Person>
                  ) => {
                    render(html`${model.item.firstName} ${model.item.lastName}`, root);
                  }}"
                ></vaadin-grid-column>
              </vaadin-grid>
            `,
            root
          );
        })}"
        .footerRenderer="${guard([], () => (root: HTMLElement) => {
          render(
            html`
              <vaadin-button theme="primary" @click="${() => (this.dialogOpened = false)}">
                Filter
              </vaadin-button>
            `,
            root
          );
        })}"
      ></vaadin-dialog>
      <!-- end::snippet[]  -->
      <vaadin-button @click="${() => (this.dialogOpened = true)}"> Show dialog </vaadin-button>
    `;
  }
}
