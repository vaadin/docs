import '../../init'; // hidden-full-source-line

import { html, LitElement, customElement } from 'lit-element';
import '@vaadin/vaadin-checkbox/vaadin-checkbox';
import '@vaadin/vaadin-checkbox/vaadin-checkbox-group';

@customElement('checkbox-disabled')
export class Example extends LitElement {
  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-checkbox-group label="Departments" theme="vertical" disabled>
        <vaadin-checkbox value="engineering">Engineering</vaadin-checkbox>
        <vaadin-checkbox value="human-resources">Human Resources</vaadin-checkbox>
        <vaadin-checkbox value="marketing">Marketing</vaadin-checkbox>
        <vaadin-checkbox value="operations">Operations</vaadin-checkbox>
        <vaadin-checkbox value="sales">Sales</vaadin-checkbox>
      </vaadin-checkbox-group>
      <!-- end::snippet[] -->
    `;
  }
}
