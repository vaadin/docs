import 'Frontend/demo/init'; // hidden-full-source-line
import '@vaadin/flow-frontend/gridConnector.js'; // hidden-full-source-line (Grid's connector)

import { customElement, LitElement, internalProperty } from 'lit-element';
import '@vaadin/vaadin-grid/vaadin-grid';
import '@vaadin/vaadin-form-layout/vaadin-form-layout';
import '@vaadin/vaadin-text-field/vaadin-text-field';
import { GridActiveItemChanged, GridElement, GridItemModel } from '@vaadin/vaadin-grid/vaadin-grid';
import { getPeople } from 'Frontend/demo/domain/DataService';
import { render, html } from 'lit-html';
import Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { applyTheme } from 'Frontend/generated/theme';
import { guard } from 'lit-html/directives/guard';

// tag::snippet[]
@customElement('grid-item-details')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  @internalProperty()
  private items: Person[] = [];

  @internalProperty()
  private detailsOpenedItem: any[] = [];

  async firstUpdated() {
    const people = (await getPeople()).people.map((person) => ({
      ...person,
      displayName: `${person.firstName} ${person.lastName}`,
    }));
    this.items = people;
  }

  render() {
    return html`
      <vaadin-grid
        theme="row-stripes"
        .items="${this.items}"
        .detailsOpenedItems="${this.detailsOpenedItem}"
        @active-item-changed="${(e: GridActiveItemChanged) =>
          (this.detailsOpenedItem = [e.detail.value])}"
        .rowDetailsRenderer="${guard(
          [],
          () => (root: HTMLElement, _: GridElement, model: GridItemModel) => {
            const person = model.item as Person;

            render(
              html`<vaadin-form-layout .responsiveSteps="${[{ minWidth: '0', columns: 3 }]}">
                <vaadin-text-field
                  label="Email address"
                  .value="${person.email}"
                  colspan="3"
                  readonly
                ></vaadin-text-field>
                <vaadin-text-field
                  label="Phone number"
                  .value="${person.address.phone}"
                  colspan="3"
                  readonly
                ></vaadin-text-field>
                <vaadin-text-field
                  label="Street address"
                  .value="${person.address.street}"
                  colspan="3"
                  readonly
                ></vaadin-text-field>
                <vaadin-text-field
                  label="ZIP code"
                  .value="${person.address.zip}"
                  readonly
                ></vaadin-text-field>
                <vaadin-text-field
                  label="City"
                  .value="${person.address.city}"
                  readonly
                ></vaadin-text-field>
                <vaadin-text-field
                  label="State"
                  .value="${person.address.state}"
                  readonly
                ></vaadin-text-field>
              </vaadin-form-layout>`,
              root
            );
          }
        )}"
      >
        <vaadin-grid-column path="displayName"></vaadin-grid-column>
        <vaadin-grid-column path="profession"></vaadin-grid-column>
      </vaadin-grid>
    `;
  }
}
// end::snippet[]
