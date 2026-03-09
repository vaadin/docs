import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/avatar';
import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { getPeople } from 'Frontend/demo/domain/DataService';
import { applyTheme } from 'Frontend/demo/theme';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';

@customElement('avatar-name')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    applyTheme(root);
    return root;
  }

  @state()
  private person: Person | undefined;

  protected override async firstUpdated() {
    const { people } = await getPeople({ count: 1 });
    this.person = people[0];
  }

  protected override render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-avatar .name="${`${this.person?.firstName} ${this.person?.lastName}`}">
      </vaadin-avatar>
      <!-- end::snippet[] -->
    `;
  }
}
