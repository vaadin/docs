import 'Frontend/demo/init'; // hidden-source-line
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import '@vaadin/avatar';
import '@vaadin/horizontal-layout';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('avatar-abbreviation')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  protected override render() {
    return html`
      <vaadin-horizontal-layout theme="spacing">
        <!-- tag::snippet[] -->
        <vaadin-avatar name="Augusta Ada King"></vaadin-avatar>

        <vaadin-avatar name="Augusta Ada King" abbr="AK"></vaadin-avatar>
        <!-- end::snippet[] -->
      </vaadin-horizontal-layout>
    `;
  }
}
