import 'Frontend/demo/init'; // hidden-full-source-line
import '@vaadin/flow-frontend/gridConnector.js'; // hidden-full-source-line (Grid's connector)

import { customElement, LitElement, internalProperty, html } from 'lit-element';
import '@vaadin/vaadin-grid/vaadin-grid';
import '@vaadin/vaadin-icons/vaadin-icons';
import { GridItemModel } from '@vaadin/vaadin-grid/vaadin-grid';
import { getPeople } from 'Frontend/demo/domain/DataService';
import { render } from 'lit-html';
import Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('grid-column-header-footer')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  // tag::snippet[]
  @internalProperty()
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
          .footerRenderer="${this.displayNameFooterRenderer}"
        ></vaadin-grid-column>
        <vaadin-grid-column
          .renderer="${this.subscriberRenderer}"
          .headerRenderer="${this.subscriberHeaderRenderer}"
          .footerRenderer="${this.subscriberFooterRenderer}"
        ></vaadin-grid-column>
        <vaadin-grid-column
          path="membership"
          .headerRenderer="${this.membershipHeaderRenderer}"
          .footerRenderer="${this.membershipFooterRenderer}"
        ></vaadin-grid-column>
      </vaadin-grid>
    `;
  }

  displayNameFooterRenderer = (root: HTMLElement) => {
    render(html`<span>200 total members</span>`, root);
  };

  subscriberHeaderRenderer = (root: HTMLElement) => {
    render(
      html`
        <vaadin-horizontal-layout style="align-items: center;">
          <span>Suscriber</span>
          <iron-icon
            icon="vaadin:info-circle"
            title="Suscriber are paying customers"
            style="height: var(--lumo-font-size-m); color: var(--lumo-contrast-70pct);"
          ></iron-icon>
        </vaadin-horizontal-layout>
      `,
      root
    );
  };

  subscriberRenderer = (root: HTMLElement, _: HTMLElement, model: GridItemModel) => {
    const person = model.item as Person;
    render(html`<span>${person.subscriber ? 'Yes' : 'No'}</span>`, root);
  };

  subscriberFooterRenderer = (root: HTMLElement) => {
    render(html`<span>102 subscribers</span>`, root);
  };

  membershipHeaderRenderer = (root: HTMLElement) => {
    render(
      html`
        <vaadin-horizontal-layout style="align-items: center;">
          <span>Membership</span>
          <iron-icon
            icon="vaadin:info-circle"
            title="Membership levels determines which features a client has access to"
            style="height: var(--lumo-font-size-m); color: var(--lumo-contrast-70pct);"
          ></iron-icon>
        </vaadin-horizontal-layout>
      `,
      root
    );
  };

  membershipFooterRenderer = (root: HTMLElement) => {
    render(html`<span>103 regular, 71 premium , 66 VIP</span>`, root);
  };
  // end::snippet[]
}
