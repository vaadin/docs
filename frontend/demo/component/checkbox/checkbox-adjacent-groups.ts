import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import '@vaadin/checkbox';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('checkbox-adjacent-groups')
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
      <vaadin-vertical-layout>
        <vaadin-checkbox-group label="Manufacturer" theme="vertical">
          <vaadin-checkbox value="0" label="Akuchi"></vaadin-checkbox>
          <vaadin-checkbox value="1" label="Broek"></vaadin-checkbox>
          <vaadin-checkbox value="2" label="Wulf"></vaadin-checkbox>
        </vaadin-checkbox-group>

        <vaadin-checkbox-group label="Status" theme="vertical">
          <vaadin-checkbox value="0" label="In progress"></vaadin-checkbox>
          <vaadin-checkbox value="1" label="Done"></vaadin-checkbox>
          <vaadin-checkbox value="2" label="Cancelled"></vaadin-checkbox>
        </vaadin-checkbox-group>
      </vaadin-vertical-layout>
      <!-- end::snippet[] -->
    `;
  }
}
