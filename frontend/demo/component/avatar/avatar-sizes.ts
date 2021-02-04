import '../../init'; // hidden-full-source-line

import { html, LitElement, customElement, internalProperty } from 'lit-element';
import '@vaadin/vaadin-avatar/vaadin-avatar';
import { applyTheme } from 'themes/theme-generated.js';
import { getPeople } from '../../domain/DataService';
import Person from '../../../generated/com/vaadin/demo/domain/Person';

@customElement('avatar-basic')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  @internalProperty()
  private person!: Person;

  async firstUpdated() {
    const people = await getPeople(1);
    this.person = people[0];
  }

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-avatar abbr="AL" theme="xlarge"></vaadin-avatar>
      <vaadin-avatar abbr="AL" theme="large"></vaadin-avatar>
      <vaadin-avatar abbr="AL" theme="small"></vaadin-avatar>
      <vaadin-avatar abbr="AL" theme="xsmall"></vaadin-avatar>
      <!-- end::snippet[] -->
    `;
  }
}
