import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '@vaadin/item';
import '@vaadin/list-box';
import '@vaadin/select';
import { SelectItem } from '@vaadin/select';
import { applyTheme } from 'Frontend/generated/theme';
import { getPeople } from 'Frontend/demo/domain/DataService';

@customElement('select-complex-value-label')
export class Example extends LitElement {
  protected createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  @state()
  private items: SelectItem[] = [];

  async firstUpdated() {
    const people = (await getPeople({ count: 5 })).people;
    // tag::snippet[]
    this.items = people.map((person) => {
      return {
        label: `${person.firstName} ${person.lastName}`,
        value: `${person.id}`,
      };
    });
    // end::snippet[]
  }

  render() {
    return html`<vaadin-select label="Assignee" .items="${this.items}"></vaadin-select>`;
  }
}
