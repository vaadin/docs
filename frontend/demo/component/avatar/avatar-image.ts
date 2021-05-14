import 'Frontend/demo/init'; // hidden-source-line
import { LitElement, html } from 'lit';
import { customElement, state } from `lit/decorators.js`;
import '@vaadin/vaadin-avatar/vaadin-avatar';
import { applyTheme } from 'Frontend/generated/theme';
import { getPeople } from '../../domain/DataService';
import Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import * as companyLogo from '../../../../src/main/resources/images/company-logo.png';

@customElement('avatar-image')
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
      <vaadin-avatar
        .img="${this.person?.pictureUrl}"
        .name="${`${this.person?.firstName} ${this.person?.lastName}`}"
      >
      </vaadin-avatar>
      <vaadin-avatar .img="${companyLogo}" name="Company Inc."> </vaadin-avatar>
      <!-- end::snippet[] -->
    `;
  }
}
