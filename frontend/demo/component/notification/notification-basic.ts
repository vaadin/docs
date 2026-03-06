import 'Frontend/demo/init'; // hidden-source-line
import { LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { Notification } from '@vaadin/notification';

export @customElement('notification-basic')
class Example extends LitElement {
  firstUpdated() {
    // tag::snippet[]
    const notification = Notification.show('Financial report generated', {
      position: 'middle',
      duration: 0,
    });
    // end::snippet[]
  }
}
