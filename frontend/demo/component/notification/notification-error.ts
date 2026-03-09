import 'Frontend/demo/init'; // hidden-source-line
import { LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { Notification } from '@vaadin/notification';

@customElement('notification-error')
export class Example extends LitElement {
  firstUpdated() {
    // tag::snippet[]
    const notification = Notification.show('Failed to generate report', {
      position: 'middle',
      duration: 0,
      theme: 'error',
    });
    // end::snippet[]
  }
}
