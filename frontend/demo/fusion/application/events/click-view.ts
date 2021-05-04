import 'Frontend/demo/init'; // hidden-source-line
import { customElement, html, LitElement } from 'lit-element';
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
