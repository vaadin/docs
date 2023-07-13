import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import '@vaadin/progress-bar';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('progress-bar-completion-time')
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
      <div>
        <label class="text-secondary" id="pblbl">Generating report...</label>
        <vaadin-progress-bar
          indeterminate
          aria-labelledby="pblbl"
          aria-describedby="sublbl"
        ></vaadin-progress-bar>
        <span class="text-secondary text-xs" id="sublbl">
          Process can take upwards of 10 minutes
        </span>
      </div>
      <!-- end::snippet[] -->
    `;
  }
}
