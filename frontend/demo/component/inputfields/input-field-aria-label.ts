import '../../init'; // hidden-full-source-line

import { html, LitElement, customElement } from 'lit-element';
import '@vaadin/vaadin-text-field';
import '@vaadin/vaadin-icons/vaadin-icons';
import '@polymer/iron-icon';
import { applyTheme } from 'themes/theme-generated.js';

@customElement('input-field-aria-label')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom application theme to the view.
    // This is only supported if your app uses a custom theme.
    applyTheme(this.shadowRoot);
  }

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-text-field aria-label="search" placeholder="Search" clear-button-visible>
        <iron-icon icon="vaadin:search" slot="prefix"></iron-icon>
      </vaadin-text-field>
      <!-- end::snippet[] -->
    `;
  }
}
