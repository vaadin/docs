import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import '@vaadin/progress-bar';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('progress-bar-determinate')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  protected override render() {
    return html`
      <!-- tag::snippet[] -->
      <div style="color: var(--lumo-secondary-text-color);">
        <div>Processing Financials.xlsx (50%)</div>
        <vaadin-progress-bar value="0.5"></vaadin-progress-bar>
      </div>
      <!-- end::snippet[] -->
    `;
  }
}
