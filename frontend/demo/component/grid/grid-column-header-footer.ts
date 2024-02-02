import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '@vaadin/grid';
import {
  columnBodyRenderer,
  columnFooterRenderer,
  columnHeaderRenderer,
} from '@vaadin/grid/lit.js';
import type { GridColumnBodyLitRenderer } from '@vaadin/grid/lit.js';
import '@vaadin/horizontal-layout';
import '@vaadin/icon';
import '@vaadin/icons';
import { getPeople } from 'Frontend/demo/domain/DataService';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('grid-column-header-footer')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  // tag::snippet[]
  @state()
  private items: Person[] = [];

  protected override async firstUpdated() {
    const { people } = await getPeople();
    this.items = people.map((person) => ({
      ...person,
      displayName: `${person.firstName} ${person.lastName}`,
    }));
  }

  protected override render() {
    return html`
      <vaadin-grid .items="${this.items}">
        <vaadin-grid-column
          header="Name"
          path="displayName"
          ${columnFooterRenderer(() => html`<span>200 total members</span>`, [])}
        ></vaadin-grid-column>
        <vaadin-grid-column
          ${columnHeaderRenderer(this.subscriberHeaderRenderer, [])}
          ${columnBodyRenderer(this.subscriberRenderer, [])}
          ${columnFooterRenderer(() => html`<span>102 subscribers</span>`, [])}
        ></vaadin-grid-column>
        <vaadin-grid-column
          path="membership"
          ${columnHeaderRenderer(this.membershipHeaderRenderer, [])}
          ${columnFooterRenderer(() => html`<span>103 regular, 71 premium , 66 VIP</span>`, [])}
        ></vaadin-grid-column>
      </vaadin-grid>
    `;
  }

  private subscriberHeaderRenderer = () => html`
    <vaadin-horizontal-layout style="align-items: center;">
      <span>Subscriber</span>
      <vaadin-icon
        icon="vaadin:info-circle"
        title="Subscribers are paying customers"
        style="height: var(--lumo-font-size-m); color: var(--lumo-contrast-70pct);"
      ></vaadin-icon>
    </vaadin-horizontal-layout>
  `;

  private subscriberRenderer: GridColumnBodyLitRenderer<Person> = (person) =>
    html`<span>${person.subscriber ? 'Yes' : 'No'}</span>`;

  private membershipHeaderRenderer = () => html`
    <vaadin-horizontal-layout style="align-items: center;">
      <span>Membership</span>
      <vaadin-icon
        icon="vaadin:info-circle"
        title="Membership levels determines which features a client has access to"
        style="height: var(--lumo-font-size-m); color: var(--lumo-contrast-70pct);"
      ></vaadin-icon>
    </vaadin-horizontal-layout>
  `;
  // end::snippet[]
}
