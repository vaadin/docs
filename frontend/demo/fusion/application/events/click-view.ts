import 'Frontend/demo/init'; // hidden-source-line
import { html, LitElement } from 'lit';
import {customElement} from 'lit/decorators.js';
import '@vaadin/vaadin-button/vaadin-button';

// tag::snippet[]
@customElement('click-view')
export class ClickView extends LitElement {
  render() {
    return html`<vaadin-button @click="${this.sayHello}">Say hello</vaadin-button>`;
  }

  private sayHello() {
    alert('Hello');
  }
}
// end::snippet[]
