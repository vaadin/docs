import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement, customElement } from 'lit-element';
import '@vaadin/vaadin-ordered-layout/vaadin-horizontal-layout';
import '@vaadin/vaadin-icons/vaadin-icons';
import '@vaadin/vaadin-button/vaadin-button';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('button-icons')
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
        <vaadin-button theme="icon" aria-label="Add item">
          <iron-icon icon="vaadin:plus"></iron-icon>
        </vaadin-button>

        <vaadin-button theme="icon" aria-label="Close">
          <iron-icon icon="vaadin:close-small"></iron-icon>
        </vaadin-button>

        <vaadin-button>
          <iron-icon icon="vaadin:arrow-left" slot="prefix"></iron-icon>
          Left
        </vaadin-button>

        <vaadin-button>
          Right
          <iron-icon icon="vaadin:arrow-right" slot="suffix"></iron-icon>
        </vaadin-button>
        <!-- end::snippet[] -->
      </vaadin-horizontal-layout>
    `;
  }
}
