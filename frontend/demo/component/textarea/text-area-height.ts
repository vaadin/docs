import '../../init'; // hidden-full-source-line

import { html, LitElement, customElement } from 'lit-element';
import { sampleText } from './text-area-sample-text';
import '@vaadin/vaadin-text-field/vaadin-text-area';

@customElement('text-area-height')
export class Example extends LitElement {
  render() {
    return html`
      <!-- tag::snippet[] -->
      <style>
        vaadin-text-area {
          width: 100%;
          min-height: 100px;
          max-height: 150px;
        }
      </style>

      <vaadin-text-area label="Description" value="${sampleText}"></vaadin-text-area>
      <!-- end::snippet[] -->
    `;
  }
}
