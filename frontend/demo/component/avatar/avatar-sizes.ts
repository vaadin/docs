import '../../init'; // hidden-full-source-line

import { html, LitElement, customElement, internalProperty } from 'lit-element';
import '@vaadin/vaadin-avatar/vaadin-avatar';
import { applyTheme } from 'generated/theme';
import { getPeople } from '../../domain/DataService';
import Person from '../../../generated/com/vaadin/demo/domain/Person';

@customElement('avatar-sizes')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  @internalProperty()
  private person?: Person;

  async firstUpdated() {
    [this.person] = await getPeople(1);
  }

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-avatar .name=${`${this.person?.firstName} ${this.person?.lastName}`} theme="xlarge">
      </vaadin-avatar>
      <vaadin-avatar .name=${`${this.person?.firstName} ${this.person?.lastName}`} theme="large">
      </vaadin-avatar>
      <vaadin-avatar .name=${`${this.person?.firstName} ${this.person?.lastName}`} theme="small">
      </vaadin-avatar>
      <vaadin-avatar .name=${`${this.person?.firstName} ${this.person?.lastName}`} theme="xsmall">
      </vaadin-avatar>
      <!-- end::snippet[] -->
    `;
  }
}
