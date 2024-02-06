import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '@vaadin/item';
import '@vaadin/list-box';
import '@vaadin/select';
import { selectRenderer } from '@vaadin/select/lit.js';
import { applyTheme } from 'Frontend/generated/theme';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { getPeople } from 'Frontend/demo/domain/DataService';

const formatPersonFullName = (person: Person) => `${person.firstName} ${person.lastName}`;

@customElement('select-custom-renderer-label')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  @state()
  private people: Person[] = [];

  protected override async firstUpdated() {
    this.people = (await getPeople({ count: 5 })).people;
  }

  protected override render() {
    return html`
      <vaadin-select
        label="Assignee"
        ${selectRenderer(
          () => html`
            <vaadin-list-box>
              ${this.people.map(
                (person) => html`
                  <!-- tag::snippet[] -->
                  <!-- Use the label attribute to display full name of the person as selected value label -->
                  <vaadin-item value="${person.id}" label="${formatPersonFullName(person)}">
                    <div style="display: flex; align-items: center;">
                      <img
                        src="${person.pictureUrl}"
                        alt="Portrait of ${formatPersonFullName(person)}"
                        style="width: var(--lumo-size-m); margin-right: var(--lumo-space-s);"
                      />
                      <div>
                        ${formatPersonFullName(person)}
                        <div
                          style="font-size: var(--lumo-font-size-s); color: var(--lumo-secondary-text-color);"
                        >
                          ${person.profession}
                        </div>
                      </div>
                    </div>
                  </vaadin-item>
                  <!-- end::snippet[] -->
                `
              )}
            </vaadin-list-box>
          `,
          this.people
        )}
      ></vaadin-select>
    `;
  }
}
