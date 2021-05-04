import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement, customElement } from 'lit-element';
import '@vaadin/vaadin-progress-bar/vaadin-progress-bar';
import '@vaadin/vaadin-ordered-layout/vaadin-vertical-layout';
import '@vaadin/vaadin-custom-field/vaadin-custom-field';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('progress-bar-theme-variants')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
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
