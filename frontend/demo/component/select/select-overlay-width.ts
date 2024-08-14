import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '@vaadin/item';
import '@vaadin/list-box';
import '@vaadin/select';
import type { SelectItem } from '@vaadin/select';
import { applyTheme } from 'Frontend/generated/theme';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { getPeople } from 'Frontend/demo/domain/DataService';

const formatPersonFullName = (person: Person) => `${person.firstName} ${person.lastName}`;

@customElement('select-overlay-width')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  @state()
  private items: SelectItem[] = [];

  protected override async firstUpdated() {
    const { people } = await getPeople({ count: 5 });
    this.items = people.map((person) => ({
      value: formatPersonFullName(person),
      label: `${person.profession} - ${formatPersonFullName(person)}`,
    }));
  }

  protected override render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-select
        style="--vaadin-select-overlay-width: 350px"
        label="Employee"
        .items="${this.items}"
      ></vaadin-select>
      <!-- end::snippet[] -->
    `;
  }
}
