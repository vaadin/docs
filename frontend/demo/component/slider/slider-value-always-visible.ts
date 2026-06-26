import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/slider';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/demo/theme';

@customElement('slider-value-always-visible')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    applyTheme(root);
    return root;
  }

  protected override render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-slider
        label="Brightness"
        min="0"
        max="100"
        value="75"
        value-always-visible
      ></vaadin-slider>
      <!-- end::snippet[] -->
    `;
  }
}
