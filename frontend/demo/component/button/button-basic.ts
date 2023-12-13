import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '@vaadin/button';
import '@vaadin/horizontal-layout';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('button-basic')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  @state()
  private counter = 0;

  protected override render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-horizontal-layout theme="spacing" style="align-items: baseline">
        <vaadin-button @click="${() => this.counter++}">Button</vaadin-button>
        <p>Clicked ${this.counter} times</p>
      </vaadin-horizontal-layout>
      <!-- end::snippet[] -->
    `;
  }
}
