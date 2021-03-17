import 'Frontend/demo/init'; // hidden-full-source-line

import { html, LitElement, customElement, internalProperty } from 'lit-element';
import '@vaadin/vaadin-list-box';
import '@vaadin/vaadin-item/vaadin-item';
import '@vaadin/vaadin-icons/vaadin-icons';
import '@polymer/iron-icon';
import Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { getPeople } from 'Frontend/demo/domain/DataService';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('list-box-custom-item-presentation')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  @internalProperty()
  private items: Person[] = [];

  async firstUpdated() {
    const { people } = await getPeople({ count: 5 });
    this.items = people;
  }

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-list-box multiple .selectedValues=${[0, 2]}>
        ${this.items.map(
          person => html`
            <vaadin-item>
              <div style="display: flex;">
                <img
                  style="height: var(--lumo-size-m); margin-right: var(--lumo-space-s);"
                  src=${person.pictureUrl}
                  alt="Portrait of ${person.firstName} ${person.lastName}"
                />
                <div>
                  ${person.firstName} ${person.lastName}
                  <div
                    style="font-size: var(--lumo-font-size-s); color: var(--lumo-secondary-text-color);"
                  >
                    ${person.profession}
                  </div>
                </div>
              </div>
            </vaadin-item>
          `
        )}
      </vaadin-list-box>
      <!-- end::snippet[] -->
    `;
  }
}
