import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '@vaadin/combo-box';
import type { ComboBoxCustomValueSetEvent } from '@vaadin/combo-box';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('combo-box-custom-entry-2')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  @state()
  private items = ['Chrome', 'Edge', 'Firefox', 'Safari'];

  protected override render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-combo-box
        allow-custom-value
        label="Browser"
        helper-text="Select or type a browser"
        .items="${this.items}"
        @custom-value-set="${(event: ComboBoxCustomValueSetEvent) => {
          this.items = [...this.items, event.detail];
        }}"
      ></vaadin-combo-box>
      <!-- end::snippet[] -->
    `;
  }
}
