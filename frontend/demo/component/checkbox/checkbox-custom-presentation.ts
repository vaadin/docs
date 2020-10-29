import '../../init'; // hidden-full-source-line

import { html, LitElement, customElement, property } from 'lit-element';
import '@vaadin/vaadin-checkbox/vaadin-checkbox';
import { Person } from '../../domain/Person';
import { getPeople } from '../../domain/DataService';

// tag::snippet[]
@customElement('checkbox-custom-presentation')
export class Example extends LitElement {
  @property({ type: Array })
  private items: Person[] = [];

  async firstUpdated() {
    this.items = await getPeople(4);
  }

  render() {
    return html`<vaadin-checkbox-group label="Invitees" theme="vertical">
      ${this.items.map((person) => {
        return html`<vaadin-checkbox .value=${person.id}>
          <div style="display: flex;">
            <img style="height: 2em" src=${person.pictureUrl} alt="User avatar" />
            <div>
              ${person.firstName} ${person.lastName}
              <div>${person.profession}</div>
            </div>
          </div>
        </vaadin-checkbox>`;
      })}
    </vaadin-checkbox-group>`;
  }
}
// end::snippet[]
