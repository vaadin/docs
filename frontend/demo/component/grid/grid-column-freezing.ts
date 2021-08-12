import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement, render } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '@vaadin/vaadin-grid/vaadin-grid';
import '@vaadin/vaadin-avatar/vaadin-avatar';
import '@vaadin/vaadin-ordered-layout/vaadin-horizontal-layout';
import type { GridItemModel } from '@vaadin/vaadin-grid/vaadin-grid';
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
        <!-- tag::snippet[] -->
        <vaadin-grid-column
          frozen
          header="Name"
          .renderer="${this.nameRenderer}"
          auto-width
          flex-grow="0"
        ></vaadin-grid-column>
        <!-- end::snippet[] -->
        <vaadin-grid-column path="email" auto-width></vaadin-grid-column>
        <vaadin-grid-column path="address.phone" auto-width></vaadin-grid-column>
        <vaadin-grid-column path="profession" auto-width></vaadin-grid-column>
        <vaadin-grid-column path="address.street" auto-width></vaadin-grid-column>
      </vaadin-grid>
    `;
  }

  private nameRenderer = (root: HTMLElement, _: HTMLElement, model: GridItemModel<Person>) => {
    const person = model.item;
    render(
      html`
        <vaadin-horizontal-layout theme="spacing" style="align-items: center;">
          <vaadin-avatar
            style="height: var(--lumo-size-m)"
            img="${person.pictureUrl}"
            name="${person.firstName} ${person.lastName}"
            alt="User avatar"
          ></vaadin-avatar>
          <div>${person.firstName} ${person.lastName}</div>
        </vaadin-horizontal-layout>
      `,
      root
    );
  };
}
