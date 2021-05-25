import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '@vaadin/vaadin-checkbox/vaadin-checkbox';
import '@vaadin/vaadin-checkbox/vaadin-checkbox-group';
import '@vaadin/vaadin-ordered-layout/vaadin-vertical-layout';
import { getPeople } from 'Frontend/demo/domain/DataService';
import { CheckboxElement } from '@vaadin/vaadin-checkbox/vaadin-checkbox';
import Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('checkbox-indeterminate')
export class Example extends LitElement {
  protected createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  @state()
  private items: Person[] = [];

  @state()
  private selectedIds: string[] = [];

  async firstUpdated() {
    const { people } = await getPeople({ count: 3 });
    this.items = people;
    this.selectedIds = [String(this.items[0].id), String(this.items[2].id)];
  }

  render() {
    return html`
      <vaadin-vertical-layout theme="spacing">
        <!-- tag::snippet[] -->
        <vaadin-checkbox
          .checked="${this.selectedIds.length === this.items.length}"
          .indeterminate="${this.selectedIds.length > 0 &&
          this.selectedIds.length < this.items.length}"
          @change="${(e: Event) =>
            (this.selectedIds = (e.target as CheckboxElement).checked
              ? this.items.map((person) => String(person.id))
              : [])}"
        >
          Notify users
        </vaadin-checkbox>

        <vaadin-checkbox-group
          label="Users to notify"
          theme="vertical"
          .value="${this.selectedIds}"
          @value-changed="${(e: CustomEvent) => (this.selectedIds = e.detail.value)}"
        >
          ${this.items.map((person) => {
            return html`
              <vaadin-checkbox .value="${String(person.id)}">
                ${person.firstName} ${person.lastName}
              </vaadin-checkbox>
            `;
          })}
        </vaadin-checkbox-group>
        <!-- end::snippet[] -->
      </vaadin-vertical-layout>
    `;
  }
}
