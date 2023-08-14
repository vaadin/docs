import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import '@vaadin/progress-bar';
import '@vaadin/vertical-layout';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('progress-bar-theme-variants')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  protected override render() {
    return html`
      <vaadin-vertical-layout theme="spacing">
        <!-- tag::snippet[] -->
        <vaadin-progress-bar value="0.5" theme="contrast"></vaadin-progress-bar>
        <vaadin-progress-bar value="0.75" theme="success"></vaadin-progress-bar>
        <vaadin-progress-bar value="0.2" theme="error"></vaadin-progress-bar>
        <!-- end::snippet[] -->
      </vaadin-vertical-layout>
    `;
  }
}
