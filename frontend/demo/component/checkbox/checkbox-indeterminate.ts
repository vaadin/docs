import '../../init'; // hidden-full-source-line

import { html, LitElement, customElement, property } from 'lit-element';
import '@vaadin/vaadin-checkbox/vaadin-checkbox';
import '@vaadin/vaadin-checkbox/vaadin-checkbox-group';
import '@vaadin/vaadin-ordered-layout/vaadin-vertical-layout';
import { getPeople } from '../../domain/DataService';
import type { CheckboxElement } from '@vaadin/vaadin-checkbox/vaadin-checkbox';
import { Person } from '../../domain/Person';

@customElement('checkbox-indeterminate')
export class Example extends LitElement {
  @property({ type: Array })
  private items: Person[] = [];

  @property({ type: Array })
  private selectedIds: string[] = [];

  async firstUpdated() {
    this.items = await getPeople(3);
    this.selectedIds = [this.items[0].id, this.items[2].id];
  }

  render() {
    return html`
      <vaadin-vertical-layout theme="spacing">
        <!-- tag::snippet[] -->
        <vaadin-checkbox
          .checked=${this.selectedIds.length === this.items.length}
          .indeterminate=${this.selectedIds.length > 0 &&
          this.selectedIds.length < this.items.length}
          @change=${(e: Event) =>
            (this.selectedIds = (e.target as CheckboxElement).checked
              ? this.items.map((person) => person.id)
              : [])}
        >
          Notify users
        </vaadin-checkbox>

        <vaadin-checkbox-group
          label="Users to notify"
          theme="vertical"
          .value=${this.selectedIds}
          @value-changed=${(e: CustomEvent) => (this.selectedIds = e.detail.value)}
        >
          ${this.items.map((person) => {
            return html`<vaadin-checkbox .value=${person.id}>
              ${person.firstName} ${person.lastName}
            </vaadin-checkbox>`;
          })}
        </vaadin-checkbox-group>
        <!-- end::snippet[] -->
      </vaadin-vertical-layout>
    `;
  }
}
