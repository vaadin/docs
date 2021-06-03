import 'Frontend/demo/init'; // hidden-source-line
import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '@vaadin/vaadin-avatar/vaadin-avatar';
import { applyTheme } from 'Frontend/generated/theme';
import { getPeople } from 'Frontend/demo/domain/DataService';
import Person from 'Frontend/generated/com/vaadin/demo/domain/Person';

@customElement('avatar-basic')
export class Example extends LitElement {
  protected createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
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
      <vaadin-avatar></vaadin-avatar>
      <vaadin-avatar .name="${`${this.person?.firstName} ${this.person?.lastName}`}">
      </vaadin-avatar>
      <vaadin-avatar
        .img="${this.person?.pictureUrl}"
        .name="${`${this.person?.firstName} ${this.person?.lastName}`}"
      >
      </vaadin-avatar>
      <!-- end::snippet[] -->
    `;
  }
}
