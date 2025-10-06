import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/avatar-group';
import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { getPeople } from 'Frontend/demo/domain/DataService';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { applyTheme } from 'Frontend/demo/theme';

@customElement('avatar-group-max-items')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    applyTheme(root);
    return root;
  }

  @state()
  private items: Person[] = [];

  protected override async firstUpdated() {
    const { people } = await getPeople({ count: 6 });
    this.items = people;
  }

  protected override render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-avatar-group
        .maxItemsVisible="${3}"
        .items="${this.items.map((person) => ({
          name: `${person.firstName} ${person.lastName}`,
        }))}"
      ></vaadin-avatar-group>
      <!-- end::snippet[] -->
    `;
  }
}
