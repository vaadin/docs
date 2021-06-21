import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/flow-frontend/gridConnector.js'; // hidden-source-line (Grid's connector)

import { html, LitElement, render } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '@vaadin/vaadin-grid/vaadin-grid';
import '@vaadin/vaadin-grid/vaadin-grid-selection-column';
import '@vaadin/vaadin-button/vaadin-button';
import '@vaadin/vaadin-split-layout/vaadin-split-layout';
import '@vaadin/vaadin-icons/vaadin-icons';
import { getPeople } from 'Frontend/demo/domain/DataService';
import Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { applyTheme } from 'Frontend/generated/theme';

// tag::snippet[]
@customElement('grid-column-width')
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
    const people = (await getPeople()).people.map((person) => ({
      ...person,
      displayName: `${person.firstName} ${person.lastName}`,
    }));
    this.items = people;
  }

  render() {
    return html`
      <vaadin-split-layout>
        <vaadin-grid .items="${this.items}" style="width: 100%;">
          <vaadin-grid-selection-column></vaadin-grid-selection-column>
          <vaadin-grid-column path="displayName" width="10em"></vaadin-grid-column>
          <vaadin-grid-column path="profession" auto-width></vaadin-grid-column>
          <vaadin-grid-column path="email"></vaadin-grid-column>
          <vaadin-grid-column
            width="7em"
            header="Manage"
            .renderer="${this.manageRenderer}"
            auto-width
          ></vaadin-grid-column>
        </vaadin-grid>
        <div></div>
      </vaadin-split-layout>
    `;
  }

  private manageRenderer = (root: HTMLElement) => {
    render(
      html`
        <vaadin-button theme="tertiary">
          <vaadin-icon icon="vaadin:pencil"></vaadin-icon>
        </vaadin-button>
        <vaadin-button theme="error tertiary">
          <vaadin-icon icon="vaadin:trash"></vaadin-icon>
        </vaadin-button>
      `,
      root
    );
  };
}
// end::snippet[]
