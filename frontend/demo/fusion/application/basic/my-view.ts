import 'Frontend/demo/init'; // hidden-source-line

import { css, html, LitElement } from 'lit';
import { customElement, query } from 'lit/decorators.js';
import '@vaadin/vaadin-button/vaadin-button';
import '@vaadin/vaadin-notification/vaadin-notification';

// tag::snippet[]
@customElement('my-view')
export class MyView extends LitElement {
  render() {
    return html`<vaadin-button @click="${this.sayHello}">Say hello</vaadin-button>`;
  }

  private sayHello() {
    alert('Hello');
  }
}
// end::snippet[]
