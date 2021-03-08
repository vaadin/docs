import '../../init'; // hidden-full-source-line
import { customElement, html, LitElement } from 'lit-element';
import '@vaadin/vaadin-button/vaadin-button';

const showNotification = (message: string) => {
  console.log(message);
};

// tag::snippet[]
@customElement('click-view')
export class ClickView extends LitElement {
  render() {
    return html`
      <vaadin-button @click="${this.sayHello}">Say hello</vaadin-button>
    `;
  }

  private sayHello() {
    showNotification('Hello');
  }
}
// end::snippet[]
