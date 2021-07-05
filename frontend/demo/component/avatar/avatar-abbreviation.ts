import 'Frontend/demo/init'; // hidden-source-line
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import '@vaadin/vaadin-avatar/vaadin-avatar';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('avatar-abbreviation')
export class Example extends LitElement {
  protected createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
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
