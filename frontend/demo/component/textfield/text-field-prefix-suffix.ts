import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement, customElement } from 'lit-element';
import '@vaadin/vaadin-text-field/vaadin-text-field';
import '@vaadin/vaadin-ordered-layout/vaadin-horizontal-layout';
import '@vaadin/vaadin-icons/vaadin-icons';
import '@polymer/iron-icon/iron-icon';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('text-field-prefix-suffix')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  render() {
    return html`
      <vaadin-horizontal-layout theme="spacing">
        <!-- tag::snippet[] -->
        <vaadin-text-field label="Username" placeholder="username" value="maverick">
          <iron-icon slot="prefix" icon="vaadin:user"></iron-icon>
        </vaadin-text-field>

        <vaadin-text-field
          label="Email Address"
          placeholder="name"
          value="michael"
          theme="align-right"
          maxlength="7"
        >
          <div slot="suffix">@example.com</div>
        </vaadin-text-field>
        <!-- end::snippet[] -->
      </vaadin-horizontal-layout>
    `;
  }
}
