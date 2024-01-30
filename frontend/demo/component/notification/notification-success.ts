import 'Frontend/demo/init'; // hidden-source-line
import { LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { Notification } from '@vaadin/notification';

@customElement('notification-success')
export class Example extends LitElement {
  firstUpdated() {
    // tag::snippet[]
    const notification = Notification.show('Application submitted!', {
      position: 'middle',
      duration: 0,
      theme: 'success',
    });
    // end::snippet[]
  }
}
