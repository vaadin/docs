import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import '@vaadin/vertical-layout';
import '@vaadin/date-time-picker';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('date-time-picker-readonly-and-disabled')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  protected override render() {
    return html`
      <vaadin-vertical-layout>
        <!-- tag::snippet[] -->
        <vaadin-date-time-picker readonly label="Read-only" value="2020-06-12T12:30">
        </vaadin-date-time-picker>

        <vaadin-date-time-picker disabled label="Disabled"></vaadin-date-time-picker>
        <!-- end::snippet[] -->
      </vaadin-vertical-layout>
    `;
  }
}
