import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement, customElement } from 'lit-element';
import '@vaadin/vaadin-radio-button/vaadin-radio-group';
import '@vaadin/vaadin-radio-button/vaadin-radio-button';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('radio-button-basic')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
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
