import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement, customElement } from 'lit-element';
import '@vaadin/vaadin-details/vaadin-details';
import '@vaadin/vaadin-ordered-layout/vaadin-vertical-layout';
import { applyTheme } from 'Frontend/generated/theme';

// tag::snippet[]
@customElement('details-basic')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  render() {
    return html`
      <vaadin-details opened>
        <div slot="summary">Contact information</div>

        <vaadin-vertical-layout>
          <span>Sophia Williams</span>
          <span>sophia.williams@company.com</span>
          <span>(501) 555-9128</span>
        </vaadin-vertical-layout>
      </vaadin-details>
    `;
  }
}
// end::snippet[]
