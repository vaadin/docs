import '../../init'; // hidden-full-source-line

import { html, LitElement, customElement } from 'lit-element';
import '@vaadin/vaadin-avatar/vaadin-avatar';
import { applyTheme } from 'generated/theme';

@customElement('avatar-name')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-avatar name="Ada Lovelace"></vaadin-avatar>
      <!-- end::snippet[] -->
    `;
  }
}
