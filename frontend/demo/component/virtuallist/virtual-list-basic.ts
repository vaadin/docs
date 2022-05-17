import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement, render, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { live } from 'lit/directives/live.js';
import '@vaadin/avatar';
import '@vaadin/details';
import { Details } from '@vaadin/details';
import '@vaadin/horizontal-layout';
import '@vaadin/vertical-layout';
import '@vaadin/virtual-list';
import type { VirtualListRenderer } from '@vaadin/virtual-list';
import { getPeople } from 'Frontend/demo/domain/DataService';
import Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('virtual-list-basic')
export class Example extends LitElement {
  protected createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  static get styles() {
    return css`
      vaadin-avatar {
        height: 64px;
        width: 64px;
      }
    `;
  }

  @state()
  private people?: Person[];

  private expandedPeople: Set<Person> = new Set();

  async firstUpdated() {
    const { people } = await getPeople();
    this.people = people;
  }

  private personCardRenderer: VirtualListRenderer<Person> = (root, _, model) => {
    const person = model.item;
    render(
      html`<vaadin-horizontal-layout theme="spacing margin">
        <vaadin-avatar
          .img="${person.pictureUrl}"
          .name="${`${person.firstName} ${person.lastName}`}"
        ></vaadin-avatar>

        <vaadin-vertical-layout>
          <b>${person.firstName} ${person.lastName}</b>
          <span>${person.profession}</span>

          <vaadin-details
            .opened="${live(this.expandedPeople.has(person))}"
            @click="${(e: Event) => {
              const details = e.currentTarget as Details;
              if (details.opened) {
                this.expandedPeople.add(person);
              } else {
                this.expandedPeople.delete(person);
              }
            }}"
          >
            <div slot="summary">Contact information</div>

            <vaadin-vertical-layout>
              <span>${person.email}</span>
              <span>${person.address.phone}</span>
            </vaadin-vertical-layout>
          </vaadin-details>
        </vaadin-vertical-layout>
      </vaadin-horizontal-layout>`,
      root
    );
  };

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-virtual-list
        .items="${this.people}"
        .renderer="${this.personCardRenderer}"
      ></vaadin-virtual-list>
      <!-- end::snippet[] -->
    `;
  }
}
