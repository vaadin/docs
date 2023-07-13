import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import '@vaadin/progress-bar';
import '@vaadin/horizontal-layout';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('progress-bar-label')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  protected override render() {
    return html`
      <div>
      <!-- tag::snippet[] -->        
        <vaadin-horizontal-layout style="justify-content: space-between;">
          <label class="text-secondary" id="pblabel">Processing Financials.xlsx</label>
          <span class="text-secondary">50%</span>
        </vaadin-horizontal-layout>

        <vaadin-progress-bar aria-labelledby="pblabel" value="0.5"></vaadin-progress-bar>
      <!-- end::snippet[] -->
      </div>
    `;
  }
}
