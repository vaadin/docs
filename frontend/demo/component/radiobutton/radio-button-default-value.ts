import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import '@vaadin/radio-group';
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
        <vaadin-radio-button value="none" label="None" checked></vaadin-radio-button>
        <vaadin-radio-button value="daily" label="Daily"></vaadin-radio-button>
        <vaadin-radio-button value="weekly" label="Weekly"></vaadin-radio-button>
        <vaadin-radio-button value="monthly" label="Monthly"></vaadin-radio-button>
      </vaadin-radio-group>
      <!-- end::snippet[] -->
    `;
  }
}
