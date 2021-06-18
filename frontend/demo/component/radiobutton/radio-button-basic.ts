import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import '@vaadin/vaadin-radio-button/vaadin-radio-group';
import '@vaadin/vaadin-radio-button/vaadin-radio-button';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('radio-button-basic')
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
      <vaadin-radio-group label="Travel class" theme="vertical">
        <vaadin-radio-button value="economy">Economy</vaadin-radio-button>
        <vaadin-radio-button value="business">Business</vaadin-radio-button>
        <vaadin-radio-button value="firstClass">First Class</vaadin-radio-button>
      </vaadin-radio-group>
      <!-- end::snippet[] -->
    `;
  }
}
