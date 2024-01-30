import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import '@vaadin/text-area';
import templates from '../../../../src/main/resources/data/templates.json';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('text-area-height')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  protected override render() {
    return html`
      <!-- tag::snippet[] -->
      <style>
        vaadin-text-area {
          width: 100%;
          min-height: 100px;
          max-height: 150px;
        }
      </style>

      <vaadin-text-area label="Description" value="${templates.loremIpsum}"></vaadin-text-area>
      <!-- end::snippet[] -->
    `;
  }
}
