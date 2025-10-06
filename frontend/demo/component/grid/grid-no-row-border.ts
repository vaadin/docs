import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/avatar';
import '@vaadin/grid';
import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import type { GridColumnBodyLitRenderer } from '@vaadin/grid/lit.js';
import { columnBodyRenderer } from '@vaadin/grid/lit.js';
import { getPeople } from 'Frontend/demo/domain/DataService';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { applyTheme } from 'Frontend/demo/theme';

@customElement('grid-no-row-border')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    applyTheme(root);
    return root;
  }

  @state()
  private items: Person[] = [];

  protected override async firstUpdated() {
    const { people } = await getPeople();
    this.items = people;
  }

  protected override render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-grid .items="${this.items}" theme="no-row-borders">
        <vaadin-grid-column
          header="Image"
          flex-grow="0"
          auto-width
          ${columnBodyRenderer(this.avatarRenderer, [])}
        ></vaadin-grid-column>
        <vaadin-grid-column path="firstName"></vaadin-grid-column>
        <vaadin-grid-column path="lastName"></vaadin-grid-column>
        <vaadin-grid-column path="email"></vaadin-grid-column>
      </vaadin-grid>
      <!-- end::snippet[] -->
    `;
  }

  private avatarRenderer: GridColumnBodyLitRenderer<Person> = (person) => html`
    <vaadin-avatar
      img="${person.pictureUrl}"
      name="${person.firstName} ${person.lastName}"
    ></vaadin-avatar>
  `;
}
