import 'Frontend/demo/init'; // hidden-source-line
import { LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { Notification } from '@vaadin/notification';

@customElement('notification-warning')
export class Example extends LitElement {
  firstUpdated() {
    // tag::snippet[]
    const notification = Notification.show('Your session is about to expire', {
      position: 'middle',
      duration: 0,
      theme: 'warning',
    });
    // end::snippet[]
  }
}
