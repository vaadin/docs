import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import '@vaadin/vaadin-button/vaadin-button';

// tag::snippet[]
@customElement('reactive-view')
export class ReactiveView extends LitElement {
  // The data
  @property({ type: Number })
  count = 0;

  // Called whenever the data changes
  render() {
    return html` <div>
      <div>The button has been clicked ${this.count} times</div>
      <vaadin-button @click="${this.increment}">Click me!</vaadin-button>
    </div>`;
  }

  // Change the data
  private increment() {
    this.count++;
  }
}
// end::snippet[]
