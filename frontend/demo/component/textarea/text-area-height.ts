import '../../init'; // hidden-full-source-line

import { html, LitElement, customElement } from 'lit-element';
import { loremIpsum } from '../../../../src/main/resources/data/templates.json';
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

      <vaadin-text-area label="Description" value="${loremIpsum}"></vaadin-text-area>
      <!-- end::snippet[] -->
    `;
  }
}
