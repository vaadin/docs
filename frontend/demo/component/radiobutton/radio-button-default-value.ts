import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import '@vaadin/vaadin-radio-button/vaadin-radio-group';
import '@vaadin/vaadin-radio-button/vaadin-radio-button';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('radio-button-default-value')
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
      <vaadin-radio-group label="Repeat" theme="vertical">
        <vaadin-radio-button value="none" checked>None</vaadin-radio-button>
        <vaadin-radio-button value="daily">Daily</vaadin-radio-button>
        <vaadin-radio-button value="weekly">Weekly</vaadin-radio-button>
        <vaadin-radio-button value="monthly">Monthly</vaadin-radio-button>
      </vaadin-radio-group>
      <!-- end::snippet[] -->
    `;
  }
}
