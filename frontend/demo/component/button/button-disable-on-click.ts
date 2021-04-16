import 'Frontend/demo/init'; // hidden-full-source-line

import { html, LitElement, customElement, internalProperty } from 'lit-element';
import '@vaadin/vaadin-button/vaadin-button';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('button-disable-on-click')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  @internalProperty()
  private disableButton = false;

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-button ?disabled="${this.disableButton}" @click="${() => (this.disableButton = true)}"
        >Perform Action</vaadin-button
      >
      <!-- end::snippet[] -->
    `;
  }
}
