import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/combo-box';
import '@vaadin/icon';
import '@vaadin/icons';
import '@vaadin/tooltip';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/demo/theme';

@customElement('combo-box-basic-features')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    applyTheme(root);
    return root;
  }

  protected override render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-combo-box
        label="Label"
        helper-text="Helper text"
        placeholder="Placeholder"
        clear-button-visible
        .items="${['Value']}"
      >
        <vaadin-tooltip slot="tooltip" text="Tooltip text"></vaadin-tooltip>
        <vaadin-icon slot="prefix" icon="vaadin:search"></vaadin-icon>
      </vaadin-combo-box>
      <!-- end::snippet[] -->
    `;
  }
}
