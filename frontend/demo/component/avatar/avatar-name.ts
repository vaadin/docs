import 'Frontend/demo/init'; // hidden-source-line
import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '@vaadin/vaadin-avatar/vaadin-avatar';
import { applyTheme } from 'Frontend/generated/theme';
import { getPeople } from 'Frontend/demo/domain/DataService';
import Person from 'Frontend/generated/com/vaadin/demo/domain/Person';

@customElement('avatar-name')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  @state()
  private person?: Person;

  async firstUpdated() {
    const { people } = await getPeople({ count: 1 });
    this.person = people[0];
  }

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-avatar .name="${`${this.person?.firstName} ${this.person?.lastName}`}">
      </vaadin-avatar>
      <!-- end::snippet[] -->
    `;
  }
}
