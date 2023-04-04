import 'Frontend/demo/init'; // hidden-source-line
import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '@vaadin/combo-box';
import '@vaadin/crud';
import '@vaadin/form-layout';
import type { FormLayoutResponsiveStep } from '@vaadin/form-layout';
import '@vaadin/email-field';
import '@vaadin/text-field';
import { getPeople } from 'Frontend/demo/domain/DataService';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('crud-editor-content')
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
  private professions: string[] = [];

  @state()
  private responsiveSteps: FormLayoutResponsiveStep[] = [];

  protected override async firstUpdated() {
    const { people } = await getPeople();
    this.items = people;
    this.professions = [...new Set(people.map((i) => i.profession))];
    this.responsiveSteps = [
      { minWidth: 0, columns: 1 },
      { minWidth: '30em', columns: 2 },
    ];
  }

  protected override render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-crud include="firstName, lastName, email, profession" .items=${this.items}>
        <vaadin-form-layout
          slot="form"
          style="max-width: 480px;"
          .responsiveSteps=${this.responsiveSteps}
        >
          <vaadin-text-field label="First name" path="firstName" required></vaadin-text-field>
          <vaadin-text-field label="Last name" path="lastName" required></vaadin-text-field>
          <vaadin-email-field colspan="2" label="Email" path="email" required></vaadin-email-field>
          <vaadin-combo-box
            colspan="2"
            label="Profession"
            path="profession"
            .items="${this.professions}"
          ></vaadin-combo-box>
        </vaadin-form-layout>
      </vaadin-crud>
      <!-- end::snippet[] -->
    `;
  }
}
