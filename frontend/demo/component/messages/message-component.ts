import 'Frontend/demo/init'; // hidden-full-source-line

import { html, LitElement, customElement, internalProperty } from 'lit-element';
import '@vaadin/vaadin-messages/vaadin-message';
import { applyTheme } from 'Frontend/generated/theme';
import { getPeople } from 'Frontend/demo/domain/DataService';
import Person from 'Frontend/generated/com/vaadin/demo/domain/Person';

@customElement('message-component')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  @internalProperty()
  private person?: Person;

  async firstUpdated() {
    const { people } = await getPeople({ count: 1 });
    this.person = people[0];
  }

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-message
        time="2021-01-28 10:43"
        user-name="Bob Ross"
        user-abbr="BR"
        user-img=${this.person?.pictureUrl}
        >The darkest nights produce the brightest stars.</vaadin-message
      >
      <!-- end::snippet[] -->
    `;
  }
}
