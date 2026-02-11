import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/horizontal-layout';
import '@vaadin/slider/vaadin-range-slider.js';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/demo/theme';

@customElement('range-slider-readonly-and-disabled')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    applyTheme(root);
    return root;
  }

  protected override render() {
    return html`
      <vaadin-horizontal-layout theme="spacing">
        <!-- tag::snippet[] -->
        <vaadin-range-slider readonly label="Read-only" .value="${[20, 80]}"></vaadin-range-slider>

        <vaadin-range-slider disabled label="Disabled"></vaadin-range-slider>
        <!-- end::snippet[] -->
      </vaadin-horizontal-layout>
    `;
  }
}
