import '../../init'; // hidden-full-source-line

import { html, LitElement, customElement } from 'lit-element';
import '@vaadin/vaadin-ordered-layout/vaadin-scroller';
import '@vaadin/vaadin-form-layout/vaadin-form-layout';
import '@vaadin/vaadin-text-field/vaadin-text-field';
import '@vaadin/vaadin-text-field/vaadin-text-area';
import '@vaadin/vaadin-date-picker/vaadin-date-picker';
import '@vaadin/vaadin-button/vaadin-button';
import '@vaadin/vaadin-icons/vaadin-icons';
import '@vaadin/vaadin-lumo-styles/icons';

@customElement('scroller-basic')
export class Example extends LitElement {

  render() {
    return html`
        <!-- tag::snippet[] -->
        <vaadin-scroller style="height: 300px; width: 300px;">
          <img src="https://cdn2.hubspot.net/hubfs/1840687/Pages/index/taskmob-laptop-mockup.png" alt="Application">
        </vaadin-scroller>
        <!-- end::snippet[] -->
    `;
  }
}
