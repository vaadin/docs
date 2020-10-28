import '../../init'; // hidden-full-source-line

import { html, LitElement, customElement, property } from 'lit-element';
import '@vaadin/vaadin-checkbox/vaadin-checkbox';
import '@vaadin/vaadin-checkbox/vaadin-checkbox-group';
import { getPeople } from '../../domain/DataService';
import type { CheckboxElement } from '@vaadin/vaadin-checkbox/vaadin-checkbox';
import { Person } from '../../domain/Person';

@customElement('checkbox-indeterminate')
export class Example extends LitElement {
  @property({ type: Array })
  private options: Person[] = [];

  // TODO: Make id natively a string type so mapping can be avoided
  @property({ type: Array })
  private selectedIds: string[] = [];

  async firstUpdated() {
    this.options = await getPeople(3);
  }

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-checkbox
        .checked=${this.selectedIds.length === this.options.length}
        .indeterminate=${this.selectedIds.length > 0 &&
        this.selectedIds.length < this.options.length}
        @change=${(e: Event) =>
          (this.selectedIds = (e.target as CheckboxElement).checked
            ? this.options.map((person) => String(person.id))
            : [])}
      >
        Notify users
      </vaadin-checkbox>

      <br />

      <vaadin-checkbox-group
        label="Users to notify"
        theme="vertical"
        .value=${this.selectedIds}
        @value-changed=${(e: CustomEvent) => (this.selectedIds = e.detail.value)}
      >
        ${this.options.map((person) => {
          return html`<vaadin-checkbox .value=${String(person.id)}>
            ${person.firstName} ${person.lastName}
          </vaadin-checkbox>`;
        })}
      </vaadin-checkbox-group>
      <!-- end::snippet[] -->
    `;
  }
}
