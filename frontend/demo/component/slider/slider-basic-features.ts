import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/slider';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/demo/theme';

@customElement('slider-basic-features')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    applyTheme(root);
    return root;
  }

  protected override render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-slider label="Label" helper-text="Helper text"></vaadin-slider>
      <!-- end::snippet[] -->
    `;
  }
}
