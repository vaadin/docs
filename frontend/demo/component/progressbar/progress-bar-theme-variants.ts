import '../../init'; // hidden-full-source-line

import { html, LitElement, customElement } from 'lit-element';
import '@vaadin/vaadin-progress-bar/vaadin-progress-bar';
import '@vaadin/vaadin-ordered-layout/vaadin-vertical-layout';

@customElement('progress-bar-theme-variants')
export class Example extends LitElement {
  render() {
    return html`
      <vaadin-vertical-layout theme="spacing">
        <!-- tag::snippet[] -->
        <div style="width: 100%">
          <div style="display: flex; justify-content: space-between;">
            <div>Transferring files...</div>
            <div style="color: var(--lumo-tertiary-text-color)">60/120</div>
          </div>
          <vaadin-progress-bar value="0.5" theme="contrast"></vaadin-progress-bar>
        </div>

        <div style="width: 100%">
          <div>Tasks</div>
          <div
            style="display: flex; justify-content: space-between; color: var(--lumo-tertiary-text-color)"
          >
            <div>15/20 completed</div>
            <div>75%</div>
          </div>
          <vaadin-progress-bar value="0.75" theme="success"></vaadin-progress-bar>
        </div>

        <div style="width: 100%">
          <div>Tasks</div>
          <div
            style="display: flex; justify-content: space-between; color: var(--lumo-tertiary-text-color)"
          >
            <div>4/20 completed</div>
            <div>20%</div>
          </div>
          <vaadin-progress-bar value="0.2" theme="error"></vaadin-progress-bar>
        </div>
        <!-- end::snippet[] -->
      </vaadin-vertical-layout>
    `;
  }
}
