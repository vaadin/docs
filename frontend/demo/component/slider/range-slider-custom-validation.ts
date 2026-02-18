import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/slider/vaadin-range-slider.js';
import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import type { RangeSliderValueChangedEvent } from '@vaadin/slider/vaadin-range-slider.js';
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

  protected override render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-range-slider
        label="Duration of Stay"
        min="1"
        max="30"
        .value="${[5, 14]}"
        .invalid="${this.invalid}"
        .errorMessage="${this.errorMessage}"
        @value-changed="${(e: RangeSliderValueChangedEvent) => {
          const [start, end] = e.detail.value;
          if (end - start < 3) {
            this.errorMessage = 'The stay must be at least 3 days';
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
