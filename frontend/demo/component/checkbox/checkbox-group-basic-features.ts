import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/checkbox-group';
import '@vaadin/tooltip';
import '@vaadin/vertical-layout';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/demo/theme';

@customElement('checkbox-group-basic-features')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    applyTheme(root);
    return root;
  }

  protected override render() {
    return html`
      <vaadin-vertical-layout theme="spacing">
        <!-- tag::snippet[] -->
        <vaadin-checkbox label="Label" helper-text="Helper text"></vaadin-checkbox>
        <vaadin-checkbox-group label="Label" helper-text="Helper text">
          <vaadin-tooltip slot="tooltip" text="Tooltip text"></vaadin-tooltip>
          <vaadin-checkbox value="1" label="Item 1"></vaadin-checkbox>
          <vaadin-checkbox value="2" label="Item 2"></vaadin-checkbox>
          <vaadin-checkbox value="3" label="Item 3"></vaadin-checkbox>
        </vaadin-checkbox-group>
        <!-- end::snippet[] -->
      </vaadin-vertical-layout>
    `;
  }
}
