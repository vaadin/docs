import '../../init'; // hidden-full-source-line

import { html, LitElement, customElement } from 'lit-element';
import '@vaadin/vaadin-checkbox/vaadin-checkbox';

// tag::snippet[]
@customElement('checkbox-trigger')
export class Example extends LitElement {
  render() {
    return html`<vaadin-checkbox>Enabled</vaadin-checkbox>`;
  }
}
// end::snippet[]
