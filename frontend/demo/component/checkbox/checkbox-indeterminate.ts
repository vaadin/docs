import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '@vaadin/checkbox';
import '@vaadin/checkbox-group';
import '@vaadin/vertical-layout';
import type { CheckboxGroupValueChangedEvent } from '@vaadin/checkbox-group';
import { getPeople } from 'Frontend/demo/domain/DataService';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('checkbox-indeterminate')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  @state()
  private items: Person[] = [];

  @state()
  private selectedIds: string[] = [];

  protected override async firstUpdated() {
    const { people } = await getPeople({ count: 3 });
    this.items = people;
    this.selectedIds = [String(this.items[0].id), String(this.items[2].id)];
  }

  protected override render() {
    const { items, selectedIds } = this;

    return html`
      <vaadin-vertical-layout theme="spacing">
        <!-- tag::snippet[] -->
        <vaadin-checkbox
          label="Notify users"
          .checked="${selectedIds.length === items.length}"
          .indeterminate="${selectedIds.length > 0 && selectedIds.length < items.length}"
          @change="${(e: Event) => {
            this.selectedIds = (e.target as HTMLInputElement).checked
              ? this.items.map((person) => String(person.id))
              : [];
          }}"
        ></vaadin-checkbox>

        <vaadin-checkbox-group
          label="Users to notify"
          theme="vertical"
          .value="${this.selectedIds}"
          @value-changed="${(event: CheckboxGroupValueChangedEvent) => {
            this.selectedIds = event.detail.value;
          }}"
        >
          ${items.map(
            (person) => html`
              <vaadin-checkbox
                .value="${String(person.id)}"
                label="${person.firstName} ${person.lastName}"
              ></vaadin-checkbox>
            `
          )}
        </vaadin-checkbox-group>
        <!-- end::snippet[] -->
      </vaadin-vertical-layout>
    `;
  }
}
