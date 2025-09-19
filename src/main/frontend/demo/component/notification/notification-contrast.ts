import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/button';
import { LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { Notification } from '@vaadin/notification';

@customElement('notification-contrast')
export class Example extends LitElement {
  firstUpdated() {
    // tag::snippet[]
    const notification = Notification.show('5 tasks deleted', {
      position: 'middle',
      duration: 0,
      theme: 'contrast',
    });
    // end::snippet[]
  }
}
