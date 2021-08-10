import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement, render } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';
import { guard } from 'lit/directives/guard.js';
import '@vaadin/vaadin-select/vaadin-select';
import { SelectElement } from '@vaadin/vaadin-select';
import '@vaadin/vaadin-list-box/vaadin-list-box';
import '@vaadin/vaadin-item/vaadin-item';
import { applyTheme } from 'Frontend/generated/theme';
import Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { getPeople } from 'Frontend/demo/domain/DataService';

const formatPersonFullName = (person: Person) => `${person.firstName} ${person.lastName}`;

@customElement('select-complex-value-label')
export class Example extends LitElement {
  protected createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  @state()
  private people: Person[] = [];

  @query('vaadin-select')
  private select?: SelectElement;

  async firstUpdated() {
    this.people = (await getPeople({ count: 5 })).people;
    // Need to manually re-run the bound renderer whenever the item set changes dynamically
    // to have the new items available for keyboard selection (with the overlay closed)
    this.select?.requestContentUpdate();
  }

  render() {
    return html`
      <vaadin-select
        label="Assignee"
        .renderer="${guard(
          [],
          () => (root: HTMLElement) =>
            render(
              html`
                <vaadin-list-box>
                  ${this.people.map(
                    (person) => html`
                      <!-- tag::snippet[] -->
                      <vaadin-item value="${person.id}">
                        <!-- Use full name of the person as text content of the item -->
                        ${formatPersonFullName(person)}
                      </vaadin-item>
                      <!-- end::snippet[] -->
                    `
                  )}
                </vaadin-list-box>
              `,
              root
            )
        )}"
      ></vaadin-select>
    `;
  }
}
