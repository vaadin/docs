import 'Frontend/demo/init'; // hidden-source-line
import { html, LitElement, customElement } from 'lit-element';
import '@vaadin/vaadin-avatar/vaadin-avatar';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('avatar-abbreviation')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-avatar name="Augusta Ada King"></vaadin-avatar>
      <vaadin-avatar name="Augusta Ada King" abbr="AK"></vaadin-avatar>
      <!-- end::snippet[] -->
    `;
  }
}
