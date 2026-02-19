import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/tooltip';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/demo/theme';

@customElement('tooltip-html-element')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    applyTheme(root);
    return root;
  }

  protected override render() {
    return html`
      <!-- tag::snippet[] -->
      <h2 id="heading">Heading with tooltip</h2>
      <vaadin-tooltip for="heading" text="This is a tooltip" position="top-start"></vaadin-tooltip>
      <!-- end::snippet[] -->
    `;
  }
}
