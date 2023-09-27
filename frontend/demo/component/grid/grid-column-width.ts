import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '@vaadin/button';
import '@vaadin/grid';
import '@vaadin/grid/vaadin-grid-selection-column.js';
import { columnBodyRenderer } from '@vaadin/grid/lit.js';
import '@vaadin/split-layout';
import { getPeople } from 'Frontend/demo/domain/DataService';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { applyTheme } from 'Frontend/generated/theme';

// tag::snippet[]
@customElement('grid-column-width')
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
      <vaadin-split-layout>
        <vaadin-grid .items="${this.items}" style="width: 100%;">
          <vaadin-grid-selection-column></vaadin-grid-selection-column>
          <vaadin-grid-column path="firstName" width="7em" flex-grow="0"></vaadin-grid-column>
          <vaadin-grid-column path="profession" auto-width flex-grow="0"></vaadin-grid-column>
          <vaadin-grid-column path="email"></vaadin-grid-column>
          <vaadin-grid-column
            width="6em"
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
