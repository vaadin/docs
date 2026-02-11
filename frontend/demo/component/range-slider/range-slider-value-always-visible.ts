import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/slider/vaadin-range-slider.js';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/demo/theme';

@customElement('range-slider-value-always-visible')
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
        label="Brightness"
        min="0"
        max="100"
        .value="${[25, 75]}"
        value-always-visible
      ></vaadin-range-slider>
      <!-- end::snippet[] -->
    `;
  }
}
