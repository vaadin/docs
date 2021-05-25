import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '@vaadin/vaadin-checkbox/vaadin-checkbox';
import { getPeople } from 'Frontend/demo/domain/DataService';
import Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { applyTheme } from 'Frontend/generated/theme';

// tag::snippet[]
@customElement('checkbox-custom-presentation')
export class Example extends LitElement {
  protected createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  @state()
  private items: Person[] = [];

  async firstUpdated() {
    const { people } = await getPeople({ count: 4 });
    this.items = people;
  }

  render() {
    return html`
      <vaadin-checkbox-group label="Invitees" theme="vertical">
        ${this.items.map((person) => {
          return html`
            <vaadin-checkbox .value="${String(person.id)}">
              <div style="display: flex;">
                <img style="height: 2em" src="${person.pictureUrl}" alt="User avatar" />
                <div>
                  ${person.firstName} ${person.lastName}
                  <div>${person.profession}</div>
                </div>
              </div>
            </vaadin-checkbox>
          `;
        })}
      </vaadin-checkbox-group>
    `;
  }
}
// end::snippet[]
