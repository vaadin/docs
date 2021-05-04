import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement, customElement } from 'lit-element';
import '@vaadin/vaadin-checkbox/vaadin-checkbox';
import '@vaadin/vaadin-checkbox/vaadin-checkbox-group';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('checkbox-disabled')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

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
