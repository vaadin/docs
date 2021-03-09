import '../../init'; // hidden-full-source-line

import { html, LitElement, customElement, internalProperty } from 'lit-element';
import '@vaadin/vaadin-checkbox/vaadin-checkbox';
import { getPeople } from '../../domain/DataService';
import Person from '../../../generated/com/vaadin/demo/domain/Person';
import { applyTheme } from 'generated/theme';

// tag::snippet[]
@customElement('checkbox-custom-presentation')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  @internalProperty()
  private items: Person[] = [];

  async firstUpdated() {
    this.items = await getPeople({ count: 4 });
  }

  render() {
    return html`
      <vaadin-checkbox-group label="Invitees" theme="vertical">
        ${this.items.map(person => {
          return html`
            <vaadin-checkbox .value=${String(person.id)}>
              <div style="display: flex;">
                <img style="height: 2em" src=${person.pictureUrl} alt="User avatar" />
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
