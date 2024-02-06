import 'Frontend/demo/init'; // hidden-source-line
import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '@vaadin/avatar';
import '@vaadin/horizontal-layout';
import { applyTheme } from 'Frontend/generated/theme';
import { getPeople } from 'Frontend/demo/domain/DataService';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import companyLogo from '../../../../src/main/resources/images/company-logo.png';

@customElement('avatar-image')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
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
          .img="${this.person?.pictureUrl}"
          .name="${`${this.person?.firstName} ${this.person?.lastName}`}"
        ></vaadin-avatar>

        <vaadin-avatar .img="${companyLogo}" name="Company Inc."></vaadin-avatar>
        <!-- end::snippet[] -->
      </vaadin-horizontal-layout>
    `;
  }
}
