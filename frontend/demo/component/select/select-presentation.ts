import '../../init'; // hidden-full-source-line
import '@vaadin/flow-frontend/selectConnector.js'; // hidden-full-source-line

import { customElement, LitElement, property, html, query } from 'lit-element';
import { render } from 'lit-html';
import '@vaadin/vaadin-select/vaadin-select';
import '@vaadin/vaadin-list-box/vaadin-list-box';
import '@vaadin/vaadin-item/vaadin-item';
import { getPeople } from '../../domain/DataService';
import Person from '../../../generated/com/vaadin/demo/domain/Person';
import { SelectElement } from '@vaadin/vaadin-select/vaadin-select';

@customElement('select-presentation')
export class Example extends LitElement {
  @property({ type: Array })
  private people: Person[] = [];

  @query('vaadin-select')
  private select?: SelectElement;

  async firstUpdated() {
    this.people = await getPeople(4);
    // Need to manually re-run the bound renderer whenever the item set changes dynamiclly
    // to have the new items available for keyboard selection (with the overlay closed)
    this.select?.render();
  }

  private boundSelectRenderer = this.selectRenderer.bind(this);

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-select label="Choose doctor" .renderer=${this.boundSelectRenderer}></vaadin-select>
      <!-- end::snippet[] -->
    `;
  }

  // tag::renderer[]
  selectRenderer(root: HTMLElement) {
    render(
      html`
        <vaadin-list-box>
          ${this.people.map(
            (person) => html`
              <vaadin-item>
                <!--
              NOTE
              We are using inline styles here to keep the example simple.
              We recommend placing CSS in a separate style sheet and
              encapsulating the styling in a new component.
            -->
                <img
                  src="${person.pictureUrl}"
                  alt="Portrait of ${person.firstName} ${person.lastName}"
                  style="width: var(--lumo-size-m); margin-right: var(--lumo-space-s);"
                />
                <div>
                  ${person.firstName} ${person.lastName}
                  <div
                    style="font-size: var(--lumo-font-size-s); color: var(--lumo-secondary-text-color);"
                  >
                    ${person.profession}
                  </div>
                </div>
              </vaadin-item>
            `
          )}
        </vaadin-list-box>
      `,
      root
    );
  }
  // end::renderer[]
}
