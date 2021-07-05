import 'Frontend/demo/init'; // hidden-source-line
import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '@vaadin/vaadin-avatar/vaadin-avatar-group';
import { applyTheme } from 'Frontend/generated/theme';
import { getPeople } from 'Frontend/demo/domain/DataService';
import Person from 'Frontend/generated/com/vaadin/demo/domain/Person';

@customElement('avatar-group-max-items')
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
