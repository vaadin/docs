import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import '@vaadin/radio-group';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('radio-button-readonly')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  protected override render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-radio-group label="Status" readonly>
        <vaadin-radio-button value="inProgress" label="In progress" checked></vaadin-radio-button>
        <vaadin-radio-button value="done" label="Done"></vaadin-radio-button>
        <vaadin-radio-button value="cancelled" label="Cancelled"></vaadin-radio-button>
      </vaadin-radio-group>
      <!-- end::snippet[] -->
    `;
  }
}
