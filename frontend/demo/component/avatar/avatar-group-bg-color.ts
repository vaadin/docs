import '../../init'; // hidden-full-source-line

import { html, LitElement, customElement, internalProperty } from 'lit-element';
import '@vaadin/vaadin-avatar/vaadin-avatar-group';
import { applyTheme } from 'generated/theme';
import { getPeople } from '../../domain/DataService';
import Person from '../../../generated/com/vaadin/demo/domain/Person';

@customElement('avatar-group-bg-color')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  @internalProperty()
  private items: Person[] = [];

  async firstUpdated() {
    this.items = await getPeople(6);
  }

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-avatar-group
        .items=${this.items.map((person, colorIndex) => {
          return {
            name: `${person.firstName} ${person.lastName}`,
            colorIndex: colorIndex
          };
        })}
      >
      </vaadin-avatar-group>
      <!-- end::snippet[] -->
    `;
  }
}
