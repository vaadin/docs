import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '@vaadin/avatar';
import '@vaadin/grid';
import { columnBodyRenderer } from '@vaadin/grid/lit.js';
import type { GridColumnBodyLitRenderer } from '@vaadin/grid/lit.js';
import { getPeople } from 'Frontend/demo/domain/DataService';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('grid-no-border')
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
    const { people } = await getPeople();
    this.items = people;
  }

  protected override render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-grid .items="${this.items}" theme="no-border">
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
      alt="User avatar"
    ></vaadin-avatar>
  `;
}
