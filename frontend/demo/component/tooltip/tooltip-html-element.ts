import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import '@vaadin/tooltip';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('tooltip-html-element')
export class Example extends LitElement {
  protected createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  render() {
    return html`
      <!-- tag::snippet[] -->
      <h2 id="heading">Heading with tooltip</h2>
      <vaadin-tooltip for="heading" text="This is a tooltip" position="top-start"></vaadin-tooltip>
      <!-- end::snippet[] -->
    `;
  }
}
