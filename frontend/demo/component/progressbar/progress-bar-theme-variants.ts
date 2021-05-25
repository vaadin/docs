import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import '@vaadin/vaadin-progress-bar/vaadin-progress-bar';
import '@vaadin/vaadin-ordered-layout/vaadin-vertical-layout';
import '@vaadin/vaadin-custom-field/vaadin-custom-field';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('progress-bar-theme-variants')
export class Example extends LitElement {
  protected createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  render() {
    return html`
      <vaadin-vertical-layout
        theme="spacing"
        style="font-family: var(--lumo-font-family); color: var(--lumo-secondary-text-color);"
      >
        <!-- tag::snippet[] -->
        <div style="width: 100%;">
          <div>Transferring files... (60/120)</div>
          <vaadin-progress-bar value="0.5" theme="contrast"></vaadin-progress-bar>
        </div>

        <div style="width: 100%;">
          <div>Tasks (15/20)</div>
          <vaadin-progress-bar value="0.75" theme="success"></vaadin-progress-bar>
        </div>

        <div style="width: 100%;">
          <div>Tasks (4/20)</div>
          <vaadin-progress-bar value="0.2" theme="error"></vaadin-progress-bar>
        </div>
        <!-- end::snippet[] -->
      </vaadin-vertical-layout>
    `;
  }
}
