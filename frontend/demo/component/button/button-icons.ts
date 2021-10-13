import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import '@vaadin/button';
import '@vaadin/horizontal-layout';
import '@vaadin/icon';
import '@vaadin/icons/vaadin-iconset';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('button-icons')
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
        <vaadin-button theme="icon" aria-label="Add item">
          <vaadin-icon icon="vaadin:plus"></vaadin-icon>
        </vaadin-button>

        <vaadin-button theme="icon" aria-label="Close">
          <vaadin-icon icon="vaadin:close-small"></vaadin-icon>
        </vaadin-button>

        <vaadin-button>
          <vaadin-icon icon="vaadin:arrow-left" slot="prefix"></vaadin-icon>
          Left
        </vaadin-button>

        <vaadin-button>
          Right
          <vaadin-icon icon="vaadin:arrow-right" slot="suffix"></vaadin-icon>
        </vaadin-button>
        <!-- end::snippet[] -->
      </vaadin-horizontal-layout>
    `;
  }
}
