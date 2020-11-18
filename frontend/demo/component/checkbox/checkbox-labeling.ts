import '../../init'; // hidden-full-source-line

import { html, LitElement, customElement } from 'lit-element';
import '@vaadin/vaadin-checkbox/vaadin-checkbox';

// tag::snippet[]
@customElement('checkbox-labeling')
export class Example extends LitElement {
  render() {
    return html`
      <vaadin-checkbox>Yes, I agree</vaadin-checkbox>
    `;
  }
}
// end::snippet[]
