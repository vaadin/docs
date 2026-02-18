import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/slider/vaadin-range-slider.js';
import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import type { RangeSliderChangeEvent } from '@vaadin/slider/vaadin-range-slider.js';
import { applyTheme } from 'Frontend/demo/theme';

@customElement('range-slider-custom-validation')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    applyTheme(root);
    return root;
  }

  @state()
  private invalid = false;

  @state()
  private errorMessage = '';

  @state()
  private value = [200, 800];

  protected override render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-range-slider
        label="Price Range"
        min="0"
        max="1000"
        step="50"
        .value="${this.value}"
        .invalid="${this.invalid}"
        .errorMessage="${this.errorMessage}"
        @change="${(e: RangeSliderChangeEvent) => {
          this.value = e.target.value;
          const [start, end] = e.target.value;
          if (end - start < 200) {
            this.errorMessage = 'Price range must span at least $200';
            this.invalid = true;
          } else {
            this.invalid = false;
          }
        }}"
      ></vaadin-range-slider>
      <!-- end::snippet[] -->
    `;
  }
}
