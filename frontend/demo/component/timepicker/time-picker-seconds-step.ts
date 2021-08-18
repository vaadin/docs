import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import '@vaadin/vaadin-time-picker/vaadin-time-picker';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('time-picker-seconds-step')
export class Example extends LitElement {
  protected createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-time-picker label="Message received" value="15:45:08" step="1"></vaadin-time-picker>
      <!-- end::snippet[] -->
    `;
  }
}
