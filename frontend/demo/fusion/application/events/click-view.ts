import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/button';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { Notification } from '@vaadin/notification';

// tag::snippet[]
@customElement('click-view')
export class ClickView extends LitElement {
  render() {
    return html`<vaadin-button @click="${this.sayHello}">Say hello</vaadin-button>`;
  }

  private sayHello() {
    Notification.show('Hello');
  }
}
// end::snippet[]
