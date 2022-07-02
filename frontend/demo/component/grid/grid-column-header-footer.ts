import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '@vaadin/grid';
import {
  columnBodyRenderer,
  columnFooterRenderer,
  columnHeaderRenderer,
  GridColumnBodyLitRenderer,
} from '@vaadin/grid/lit.js';
import '@vaadin/icon';
import '@vaadin/icons';
import { getPeople } from 'Frontend/demo/domain/DataService';
import Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('grid-column-header-footer')
export class Example extends LitElement {
  protected createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  // tag::snippet[]
  @state()
  private items: Person[] = [];

  async firstUpdated() {
    const people = (await getPeople()).people.map((person) => ({
      ...person,
      displayName: `${person.firstName} ${person.lastName}`,
    }));
    this.items = people;
  }

  render() {
    return html`
      <vaadin-grid .items="${this.items}">
        <vaadin-grid-column
          header="Name"
          path="displayName"
          ${columnFooterRenderer(this.displayNameFooterRenderer, [])}
        ></vaadin-grid-column>
        <vaadin-grid-column
          ${columnHeaderRenderer(this.subscriberHeaderRenderer, [])}
          ${columnBodyRenderer(this.subscriberRenderer, [])}
          ${columnFooterRenderer(this.subscriberFooterRenderer, [])}
        ></vaadin-grid-column>
        <vaadin-grid-column
          path="membership"
          ${columnHeaderRenderer(this.membershipHeaderRenderer, [])}
          ${columnFooterRenderer(this.membershipFooterRenderer, [])}
        ></vaadin-grid-column>
      </vaadin-grid>
    `;
  }

  private displayNameFooterRenderer = () => {
    return html`<span>200 total members</span>`;
  };

  private subscriberHeaderRenderer = () => {
    return html`
      <vaadin-horizontal-layout style="align-items: center;">
        <span>Subscriber</span>
        <vaadin-icon
          icon="vaadin:info-circle"
          title="Subscribers are paying customers"
          style="height: var(--lumo-font-size-m); color: var(--lumo-contrast-70pct);"
        ></vaadin-icon>
      </vaadin-horizontal-layout>
    `;
  };

  private subscriberRenderer: GridColumnBodyLitRenderer<Person> = (person) => {
    return html`<span>${person.subscriber ? 'Yes' : 'No'}</span>`;
  };

  private subscriberFooterRenderer = () => {
    return html`<span>102 subscribers</span>`;
  };

  private membershipHeaderRenderer = () => {
    return html`
      <vaadin-horizontal-layout style="align-items: center;">
        <span>Membership</span>
        <vaadin-icon
          icon="vaadin:info-circle"
          title="Membership levels determines which features a client has access to"
          style="height: var(--lumo-font-size-m); color: var(--lumo-contrast-70pct);"
        ></vaadin-icon>
      </vaadin-horizontal-layout>
    `;
  };

  private membershipFooterRenderer = () => {
    return html`<span>103 regular, 71 premium , 66 VIP</span>`;
  };
  // end::snippet[]
}
