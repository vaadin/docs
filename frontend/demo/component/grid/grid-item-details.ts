import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement, render } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '@vaadin/vaadin-grid/vaadin-grid';
import '@vaadin/vaadin-form-layout/vaadin-form-layout';
import '@vaadin/vaadin-text-field/vaadin-text-field';
import type {
  GridActiveItemChangedEvent,
  GridElement,
  GridItemModel,
} from '@vaadin/vaadin-grid/vaadin-grid';
import { getPeople } from 'Frontend/demo/domain/DataService';
import Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { applyTheme } from 'Frontend/generated/theme';
import { guard } from 'lit/directives/guard.js';

// tag::snippet[]
@customElement('grid-item-details')
export class Example extends LitElement {
  protected createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  @state()
  private items: Person[] = [];

  @state()
  private detailsOpenedItem: Person[] = [];

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
        .detailsOpenedItems="${this.detailsOpenedItem as any}"
        @active-item-changed="${(e: GridActiveItemChangedEvent<Person>) =>
          (this.detailsOpenedItem = [e.detail.value])}"
        .rowDetailsRenderer="${guard(
          [],
          () => (root: HTMLElement, _: GridElement, model: GridItemModel<Person>) => {
            const person = model.item;

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
        <vaadin-grid-column path="displayName" header="Name"></vaadin-grid-column>
        <vaadin-grid-column path="profession"></vaadin-grid-column>
      </vaadin-grid>
    `;
  }
}
// end::snippet[]
