import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement, customElement } from 'lit-element';
import '@vaadin/vaadin-text-field';
import '@vaadin/vaadin-icons/vaadin-icons';
import '@polymer/iron-icon';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('input-field-aria-label')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
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
