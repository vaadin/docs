import '../../init'; // hidden-full-source-line
import '@vaadin/flow-frontend/selectConnector.js'; // hidden-full-source-line

import { customElement, LitElement, property, html } from 'lit-element';
import { render } from 'lit-html';
import '@vaadin/vaadin-select/vaadin-select';
import '@vaadin/vaadin-list-box/vaadin-list-box';
import '@vaadin/vaadin-item/vaadin-item';
import { getPeople } from '../../domain/DataService';
import { Person } from '../../domain/Person';

@customElement('select-presentation')
export class Example extends LitElement {

  @property({ type: Array })
  private doctors: Person[] = [];

  async firstUpdated() {
    this.doctors = await getPeople(4);
  }

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-select
        label="Choose doctor"
        .renderer=${(root: HTMLElement) =>
          render(
            html`
              <vaadin-list-box>
                ${this.doctors.map(person => html`
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
                    style="width: var(--lumo-size-m); margin-right: var(--lumo-space-s);">
                  <div>
                    ${person.firstName} ${person.lastName}
                    <div
                      style="font-size: var(--lumo-font-size-s); color: var(--lumo-secondary-text-color);">
                      ${person.profession}
                    </div>
                  </div>
                </vaadin-item>
                `)}
            `,
            root
          )}
      ></vaadin-select>
      <!-- end::snippet[] -->
    `;
  }
}
