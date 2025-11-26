import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/progress-bar';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/demo/theme';

@customElement('progress-bar-completion-time')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    applyTheme(root);
    return root;
  }

  protected override render() {
    return html`
      <!-- tag::snippet[] -->
      <div>
        <label id="pblbl">Generating report...</label>
        <vaadin-progress-bar
          indeterminate
          aria-labelledby="pblbl"
          aria-describedby="sublbl"
        ></vaadin-progress-bar>
        <span id="sublbl" style="font-size: 0.8125rem">
          Process can take upwards of 10 minutes
        </span>
      </div>
      <!-- end::snippet[] -->
    `;
  }
}
