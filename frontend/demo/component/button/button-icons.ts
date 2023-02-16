import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import '@vaadin/button';
import '@vaadin/horizontal-layout';
import '@vaadin/icon';
import '@vaadin/icons';
import '@vaadin/tooltip';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('button-icons')
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
        <!-- Icon button using an aria-label to provide a textual alternative 
             to screen readers -->
        <vaadin-button theme="icon" aria-label="Add item">
          <vaadin-icon icon="vaadin:plus"></vaadin-icon>
        </vaadin-button>

        <!-- Icon button using a tooltip to provide a textual description of 
             the action that it triggers -->
        <vaadin-button theme="icon" aria-label="Close">
          <vaadin-icon icon="vaadin:close-small"></vaadin-icon>
          <vaadin-tooltip slot="tooltip" text="Close the dialog"></vaadin-tooltip>
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
