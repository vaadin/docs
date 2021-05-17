import 'Frontend/demo/init'; // hidden-source-line
import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '@vaadin/vaadin-avatar/vaadin-avatar-group';
import { applyTheme } from 'Frontend/generated/theme';
import { getPeople } from 'Frontend/demo/domain/DataService';
import Person from 'Frontend/generated/com/vaadin/demo/domain/Person';

@customElement('avatar-group-max-items')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  @state()
  private items: Person[] = [];

  async firstUpdated() {
    const { people } = await getPeople({ count: 6 });
    this.items = people;
  }

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-avatar-group
        .maxItemsVisible="${3}"
        .items="${this.items.map((person) => {
          return {
            name: `${person.firstName} ${person.lastName}`,
          };
        })}"
      >
      </vaadin-avatar-group>
      <!-- end::snippet[] -->
    `;
  }
}
