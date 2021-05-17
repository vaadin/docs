import 'Frontend/demo/init'; // hidden-source-line
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import '@vaadin/vaadin-split-layout/vaadin-split-layout';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('split-layout-min-max-size')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-split-layout style="max-height: 280px;">
        <master-content style="min-width: 200px; max-width: 400px;"></master-content>
        <detail-content></detail-content>
      </vaadin-split-layout>
      <!-- end::snippet[] -->
    `;
  }
}
