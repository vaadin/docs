import 'Frontend/demo/init'; // hidden-source-line
import { html, LitElement, customElement, internalProperty } from 'lit-element';
import '@vaadin/vaadin-item/vaadin-item';
import '@vaadin/vaadin-list-box';
import { applyTheme } from 'Frontend/generated/theme';
import { getPeople } from '../../domain/DataService';
import Person from '../../../generated/com/vaadin/demo/domain/Person';

@customElement('list-box-multi-selection')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  @internalProperty()
  private items: Person[] = [];

  async firstUpdated() {
    const { people } = await getPeople({ count: 20 });
    this.items = people;
  }

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-list-box multiple .selectedValues="${[0, 3]}" style="height: 200px">
        ${this.items.map(
          (person) => html` <vaadin-item> ${person.firstName} ${person.lastName} </vaadin-item> `
        )}
      </vaadin-list-box>
      <!-- end::snippet[] -->
    `;
  }
}
