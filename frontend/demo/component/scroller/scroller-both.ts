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
import * as img from '../../../../src/main/resources/images/scroller-both-img.png';

@customElement('scroller-basic')
export class Example extends LitElement {
  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-scroller style="height: 300px; width: 100%;">
        <img src="${img}" alt="Application" />
      </vaadin-scroller>
      <!-- end::snippet[] -->
    `;
  }
}
