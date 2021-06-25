import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import '@vaadin/vaadin-icon/vaadin-icon';
import '@vaadin/vaadin-icons/vaadin-iconset';
import '@vaadin/vaadin-text-field/vaadin-text-field';
import '@vaadin/vaadin-ordered-layout/vaadin-horizontal-layout';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('text-field-min-max-input-length')
export class Example extends LitElement {
  protected createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  render() {
    return html`
      <vaadin-horizontal-layout theme="spacing">
        <!-- tag::snippet[] -->
        <vaadin-text-field
          minlength="5"
          maxlength="5"
          label="Zip code"
          style="width: 6em"
        ></vaadin-text-field>

        <vaadin-text-field
          label="Username"
          helper-text="Max 16 characters"
          minlength="1"
          maxlength="16"
        >
        </vaadin-text-field>
        <!-- end::snippet[] -->
      </vaadin-horizontal-layout>
    `;
  }
}
