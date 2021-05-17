import 'Frontend/demo/init'; // hidden-source-line
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import '@vaadin/vaadin-split-layout/vaadin-split-layout';
import { applyTheme } from 'Frontend/generated/theme';
import './master-content';
import './detail-content';

@customElement('split-layout-orientation')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-split-layout style="max-height: 350px;" orientation="vertical">
        <master-content></master-content>
        <detail-content></detail-content>
      </vaadin-split-layout>
      <!-- end::snippet[] -->
    `;
  }
}
