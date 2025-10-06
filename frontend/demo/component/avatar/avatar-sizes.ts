import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/avatar';
import '@vaadin/horizontal-layout';
import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { getPeople } from 'Frontend/demo/domain/DataService';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { applyTheme } from 'Frontend/demo/theme';

@customElement('avatar-sizes')
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
      <vaadin-horizontal-layout theme="spacing">
        <!-- tag::snippet[] -->
        <vaadin-avatar
          .name="${`${this.person?.firstName} ${this.person?.lastName}`}"
          theme="xlarge"
        ></vaadin-avatar>

        <vaadin-avatar
          .name="${`${this.person?.firstName} ${this.person?.lastName}`}"
          theme="large"
        ></vaadin-avatar>

        <vaadin-avatar
          .name="${`${this.person?.firstName} ${this.person?.lastName}`}"
          theme="small"
        ></vaadin-avatar>

        <vaadin-avatar
          .name="${`${this.person?.firstName} ${this.person?.lastName}`}"
          theme="xsmall"
        ></vaadin-avatar>
        <!-- end::snippet[] -->
      </vaadin-horizontal-layout>
    `;
  }
}
