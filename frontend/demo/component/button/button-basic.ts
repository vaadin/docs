import 'Frontend/demo/init'; // hidden-source-line

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
      <vaadin-horizontal-layout theme="spacing" style="align-items: baseline">
        <vaadin-button @click="${() => this.counter++}">Button</vaadin-button>
        <div>Clicked ${this.counter} times</div>
      </vaadin-horizontal-layout>
      <!-- end::snippet[] -->
    `;
  }
}
