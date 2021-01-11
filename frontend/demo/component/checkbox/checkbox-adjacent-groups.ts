import '../../init'; // hidden-full-source-line

import { html, LitElement, customElement } from 'lit-element';
import '@vaadin/vaadin-checkbox/vaadin-checkbox';
import { applyTheme } from 'themes/theme-generated.js';

// tag::snippet[]
@customElement('checkbox-adjacent-groups')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom application theme to the view.
    // This is only supported if your app uses a custom theme.
    applyTheme(this.shadowRoot);
  }

  render() {
    return html`
      <vaadin-vertical-layout>
        <vaadin-checkbox-group label="Manufacturer" theme="vertical">
          <vaadin-checkbox value="0">Akuchi</vaadin-checkbox>
          <vaadin-checkbox value="1">Broek</vaadin-checkbox>
          <vaadin-checkbox value="2">Wulf</vaadin-checkbox>
        </vaadin-checkbox-group>

        <vaadin-checkbox-group label="Status" theme="vertical">
          <vaadin-checkbox value="0">In progress</vaadin-checkbox>
          <vaadin-checkbox value="1">Done</vaadin-checkbox>
          <vaadin-checkbox value="2">Cancelled</vaadin-checkbox>
        </vaadin-checkbox-group>
      </vaadin-vertical-layout>
    `;
  }
}
// end::snippet[]
