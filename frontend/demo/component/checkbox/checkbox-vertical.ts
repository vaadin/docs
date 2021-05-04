import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement, customElement } from 'lit-element';
import '@vaadin/vaadin-checkbox/vaadin-checkbox';
import '@vaadin/vaadin-checkbox/vaadin-checkbox-group';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('checkbox-vertical')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-checkbox-group label="Working days" theme="vertical">
        <vaadin-checkbox value="mon">Monday</vaadin-checkbox>
        <vaadin-checkbox value="tue">Tuesday</vaadin-checkbox>
        <vaadin-checkbox value="wed">Wednesday</vaadin-checkbox>
        <vaadin-checkbox value="thu">Thursday</vaadin-checkbox>
        <vaadin-checkbox value="fri">Friday</vaadin-checkbox>
        <vaadin-checkbox value="sat">Saturday</vaadin-checkbox>
        <vaadin-checkbox value="sun">Sunday</vaadin-checkbox>
      </vaadin-checkbox-group>
      <!-- end::snippet[] -->
    `;
  }
}
