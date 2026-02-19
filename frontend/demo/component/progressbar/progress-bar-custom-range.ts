import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/progress-bar';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/demo/theme';

@customElement('progress-bar-custom-range')
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
        <vaadin-progress-bar min="0" max="100" value="50"></vaadin-progress-bar>
      </div>
      <!-- end::snippet[] -->
    `;
  }
}
