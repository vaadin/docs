import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import '@vaadin/horizontal-layout';
import '@vaadin/date-picker';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('date-picker-readonly-and-disabled')
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
        <vaadin-date-picker readonly label="Read-only" value="2020-06-12"></vaadin-date-picker>

        <vaadin-date-picker disabled label="Disabled"></vaadin-date-picker>
        <!-- end::snippet[] -->
      </vaadin-horizontal-layout>
    `;
  }
}
