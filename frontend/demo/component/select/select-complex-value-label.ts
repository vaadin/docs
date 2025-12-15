import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/select';
import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import type { SelectItem } from '@vaadin/select';
import { getPeople } from 'Frontend/demo/domain/DataService';
import { applyTheme } from 'Frontend/demo/theme';

@customElement('select-complex-value-label')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    applyTheme(root);
    return root;
  }

  @state()
  private items: SelectItem[] = [];

  protected override async firstUpdated() {
    const { people } = await getPeople({ count: 5 });
    // tag::snippet[]
    this.items = people.map((person) => ({
      label: `${person.firstName} ${person.lastName}`,
      value: `${person.id}`,
    }));
    // end::snippet[]
  }

  protected override render() {
    return html`<vaadin-select label="Assignee" .items="${this.items}"></vaadin-select>`;
  }
}
