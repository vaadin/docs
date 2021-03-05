import '../../init'; // hidden-full-source-line
import { customElement, html } from 'lit-element';
import '@vaadin/vaadin-button/vaadin-button';
import { View } from '../../view';

const showNotification = (message: string) => {
  console.log(message);
};

// tag::snippet[]
@customElement('click-view')
export class ClickView extends View {
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
