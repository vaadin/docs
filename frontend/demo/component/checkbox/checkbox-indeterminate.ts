import '../../init'; // hidden-full-source-line

import { html, LitElement, customElement, property } from 'lit-element';
import '@vaadin/vaadin-checkbox/vaadin-checkbox';
import '@vaadin/vaadin-checkbox/vaadin-checkbox-group';
import { getPeople } from '../../domain/DataService';
import type { CheckboxElement } from '@vaadin/vaadin-checkbox/vaadin-checkbox';

@customElement('checkbox-indeterminate')
export class Example extends LitElement {
  @property({ type: Array })
  private people = getPeople(3);

  @property({ type: Array })
  private value: string[] = [String(this.people[0].id), String(this.people[2].id)];

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-checkbox
        .checked=${this.value.length === this.people.length}
        .indeterminate=${this.value.length > 0 && this.value.length < this.people.length}
        @change=${(e: Event) =>
          (this.value = (e.target as CheckboxElement).checked
            ? this.people.map((person) => String(person.id))
            : [])}
      >
        Notify users
      </vaadin-checkbox>
      <br />
      <vaadin-checkbox-group
        label="Users to notify"
        theme="vertical"
        .value=${this.value}
        @value-changed=${(e: CustomEvent) => (this.value = e.detail.value)}
      >
        ${this.people.map((person) => {
          return html`<vaadin-checkbox .value=${String(person.id)}>
            ${person.firstName} ${person.lastName}
          </vaadin-checkbox>`;
        })}
      </vaadin-checkbox-group>
      <!-- end::snippet[] -->
    `;
  }
}
