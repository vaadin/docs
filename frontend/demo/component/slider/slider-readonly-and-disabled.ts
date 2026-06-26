import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/horizontal-layout';
import '@vaadin/slider';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/demo/theme';

@customElement('slider-readonly-and-disabled')
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
        <vaadin-slider readonly label="Read-only" value="50"></vaadin-slider>

        <vaadin-slider disabled label="Disabled"></vaadin-slider>
        <!-- end::snippet[] -->
      </vaadin-horizontal-layout>
    `;
  }
}
