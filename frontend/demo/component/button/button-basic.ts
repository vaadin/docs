import 'Frontend/demo/init'; // hidden-full-source-line

import { html, LitElement, internalProperty, customElement } from 'lit-element';
import '@vaadin/vaadin-button/vaadin-button';
import '@vaadin/vaadin-ordered-layout/vaadin-horizontal-layout';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('button-basic')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  @internalProperty()
  private counter = 0;

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-button @click=${() => this.counter++}>Vaadin Button</vaadin-button>
      Clicked ${this.counter} times
      <!-- end::snippet[] -->
    `;
  }
}
