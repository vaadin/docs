import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement, render } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '@vaadin/button';
import '@vaadin/grid';
import type { GridItemModel } from '@vaadin/grid';
import { getPeople } from 'Frontend/demo/domain/DataService';
import Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('grid-column-freezing')
export class Example extends LitElement {
  protected createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  @state()
  private items?: Person[];

  async firstUpdated() {
    const { people } = await getPeople();
    this.items = people;
  }

  render() {
    return html`
      <vaadin-grid .items="${this.items}">
        <!-- tag::snippet1[] -->
        <vaadin-grid-column
          frozen
          header="Name"
          .renderer="${this.nameRenderer}"
          auto-width
          flex-grow="0"
        ></vaadin-grid-column>
        <!-- end::snippet1[] -->
        <vaadin-grid-column path="email" auto-width></vaadin-grid-column>
        <vaadin-grid-column path="address.phone" auto-width></vaadin-grid-column>
        <vaadin-grid-column path="profession" auto-width></vaadin-grid-column>
        <vaadin-grid-column path="address.street" auto-width></vaadin-grid-column>
        <!-- tag::snippet2[] -->
        <vaadin-grid-column
          frozen-to-end
          .renderer="${this.actionRenderer}"
          auto-width
          flex-grow="0"
        ></vaadin-grid-column>
        <!-- end::snippet2[] -->
      </vaadin-grid>
    `;
  }

  private nameRenderer = (root: HTMLElement, _: HTMLElement, model: GridItemModel<Person>) => {
    render(html`${model.item.firstName} ${model.item.lastName}`, root);
  };

  private actionRenderer = (root: HTMLElement) => {
    render(html`<vaadin-button theme="tertiary-inline">Edit</vaadin-button>`, root);
  };
}
