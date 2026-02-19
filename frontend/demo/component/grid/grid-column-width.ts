import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/button';
import '@vaadin/grid';
import '@vaadin/grid/vaadin-grid-selection-column.js';
import '@vaadin/split-layout';
import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { columnBodyRenderer } from '@vaadin/grid/lit.js';
import { getPeople } from 'Frontend/demo/domain/DataService';
import { applyTheme } from 'Frontend/demo/theme';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';

// tag::snippet[]
@customElement('grid-column-width')
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
      <vaadin-split-layout>
        <vaadin-grid .items="${this.items}" style="width: 100%;">
          <vaadin-grid-selection-column></vaadin-grid-selection-column>
          <vaadin-grid-column path="firstName" width="7rem" flex-grow="0"></vaadin-grid-column>
          <vaadin-grid-column path="profession" auto-width flex-grow="0"></vaadin-grid-column>
          <vaadin-grid-column path="email"></vaadin-grid-column>
          <vaadin-grid-column
            width="6rem"
            flex-grow="0"
            header="Has Sub"
            ${columnBodyRenderer<Person>((item) => html`${item.subscriber ? 'Yes' : 'No'}`, [])}
          ></vaadin-grid-column>
        </vaadin-grid>
        <div></div>
      </vaadin-split-layout>
    `;
  }
}
// end::snippet[]
