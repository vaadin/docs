import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/avatar-group';
import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { getPeople } from 'Frontend/demo/domain/DataService';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('avatar-group-bg-color')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
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
        .items="${this.items.map((person, index) => ({
          name: `${person.firstName} ${person.lastName}`,
          colorIndex: index,
        }))}"
      ></vaadin-avatar-group>
      <!-- end::snippet[] -->
    `;
  }
}
