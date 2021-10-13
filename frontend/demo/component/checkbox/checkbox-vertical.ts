import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import '@vaadin/checkbox';
import '@vaadin/checkbox-group';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('checkbox-vertical')
export class Example extends LitElement {
  protected createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
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
