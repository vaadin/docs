import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/slider/vaadin-range-slider.js';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/demo/theme';

@customElement('range-slider-accessible-name')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    applyTheme(root);
    return root;
  }

  protected override render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-range-slider
        label="Price range"
        min="0"
        max="1000"
        .value="${[200, 800]}"
        accessible-name-start="Minimum price"
        accessible-name-end="Maximum price"
      ></vaadin-range-slider>
      <!-- end::snippet[] -->
    `;
  }
}
