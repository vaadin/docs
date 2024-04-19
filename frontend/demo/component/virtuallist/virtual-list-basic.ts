import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { live } from 'lit/directives/live.js';
import '@vaadin/avatar';
import '@vaadin/details';
import type { Details } from '@vaadin/details';
import '@vaadin/horizontal-layout';
import '@vaadin/vertical-layout';
import '@vaadin/virtual-list';
import { virtualListRenderer } from '@vaadin/virtual-list/lit.js';
import type { VirtualListLitRenderer } from '@vaadin/virtual-list/lit.js';
import { getPeople } from 'Frontend/demo/domain/DataService';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('virtual-list-basic')
export class Example extends LitElement {
  static override styles = css`
    vaadin-avatar {
      height: 64px;
      width: 64px;
    }
  `;

  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  @state()
  private people: Person[] | undefined;

  private expandedPeople = new Set<Person>();

  protected override async firstUpdated() {
    const { people } = await getPeople();
    this.people = people;
  }

  private personCardRenderer: VirtualListLitRenderer<Person> = (person) => html`
    <vaadin-horizontal-layout theme="spacing margin">
      <vaadin-avatar
        .img="${person.pictureUrl}"
        .name="${`${person.firstName} ${person.lastName}`}"
      ></vaadin-avatar>

      <vaadin-vertical-layout>
        <b>${person.firstName} ${person.lastName}</b>
        <span>${person.profession}</span>

        <vaadin-details
          summary="Contact information"
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
          <vaadin-vertical-layout>
            <span>${person.email}</span>
            <span>${person.address.phone}</span>
          </vaadin-vertical-layout>
        </vaadin-details>
      </vaadin-vertical-layout>
    </vaadin-horizontal-layout>
  `;

  protected override render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-virtual-list
        .items="${this.people}"
        ${virtualListRenderer(this.personCardRenderer, [])}
      ></vaadin-virtual-list>
      <!-- end::snippet[] -->
    `;
  }
}
