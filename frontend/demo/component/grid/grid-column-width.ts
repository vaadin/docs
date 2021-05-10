import 'Frontend/demo/init'; // hidden-full-source-line
import '@vaadin/flow-frontend/gridConnector.js'; // hidden-full-source-line (Grid's connector)

import { customElement, LitElement, internalProperty, html } from 'lit-element';
import '@vaadin/vaadin-grid/vaadin-grid';
import '@vaadin/vaadin-grid/vaadin-grid-selection-column';
import '@vaadin/vaadin-button/vaadin-button';
import '@vaadin/vaadin-split-layout/vaadin-split-layout';
import '@vaadin/vaadin-icons/vaadin-icons';
import { getPeople } from 'Frontend/demo/domain/DataService';
import { render } from 'lit-html';
import Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { applyTheme } from 'Frontend/generated/theme';

// tag::snippet[]
@customElement('grid-column-width')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  @internalProperty()
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
          <iron-icon icon="vaadin:pencil"></iron-icon>
        </vaadin-button>
        <vaadin-button theme="error tertiary">
          <iron-icon icon="vaadin:trash"></iron-icon>
        </vaadin-button>
      `,
      root
    );
  };
}
// end::snippet[]
