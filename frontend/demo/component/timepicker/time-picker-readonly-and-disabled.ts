import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import '@vaadin/horizontal-layout';
import '@vaadin/time-picker';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('time-picker-readonly-and-disabled')
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
        <vaadin-time-picker readonly label="Read-only" value="07:00">
        </vaadin-time-picker>

        <vaadin-time-picker disabled label="Disabled">
        </vaadin-time-picker>
        <!-- end::snippet[] -->
      </vaadin-horizontal-layout>
    `;
  }
}
