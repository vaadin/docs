import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/select';
import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { getPeople } from 'Frontend/demo/domain/DataService';
import { applyTheme } from 'Frontend/demo/theme';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';

const formatPersonFullName = (person: Person) => `${person.firstName} ${person.lastName}`;

@customElement('select-custom-renderer-label')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
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
      <vaadin-select label="Assignee">
        <vaadin-select-list-box slot="overlay">
          ${this.people.map(
            (person) => html`
              <!-- tag::snippet[] -->
              <!-- Use the label attribute to display full name of the person as selected value label -->
              <vaadin-select-item value="${person.id}" label="${formatPersonFullName(person)}">
                <div class="person-item">
                  <img
                    src="${person.pictureUrl}"
                    alt="Portrait of ${formatPersonFullName(person)}"
                    style="width: 2.25rem;"
                  />
                  <span>${formatPersonFullName(person)}</span>
                  <span>${person.profession}</span>
                </div>
              </vaadin-select-item>
              <!-- end::snippet[] -->
            `
          )}
        </vaadin-select-list-box>
      </vaadin-select>
    `;
  }
}
