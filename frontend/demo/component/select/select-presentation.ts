import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '@vaadin/item';
import '@vaadin/list-box';
import '@vaadin/select';
import { selectRenderer } from '@vaadin/select/lit.js';
import { getPeople } from 'Frontend/demo/domain/DataService';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('select-presentation')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  @state()
  private people: Person[] = [];

  protected override async firstUpdated() {
    const { people } = await getPeople({ count: 4 });
    this.people = people;
  }

  protected override render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-select
        label="Choose doctor"
        ${selectRenderer(this.renderer, this.people)}
      ></vaadin-select>
      <!-- end::snippet[] -->
    `;
  }

  // tag::renderer[]
  private renderer = () => html`
    <vaadin-list-box>
      ${this.people.map(
        (person) => html`
          <vaadin-item value="${person.id}">
            <!--
            NOTE
            We are using inline styles here to keep the example simple.
            We recommend placing CSS in a separate style sheet and
            encapsulating the styling in a new component.
          -->
            <div style="display: flex; align-items: center;">
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
            </div>
          </vaadin-item>
        `
      )}
    </vaadin-list-box>
  `;
  // end::renderer[]
}
