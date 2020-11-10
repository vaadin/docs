import '../../init'; // hidden-full-source-line

import { html, LitElement, customElement, css } from 'lit-element';
import { loremIpsum } from '../../../../src/main/resources/data/templates.json';
import '@vaadin/vaadin-text-field/vaadin-text-area';

@customElement('text-area-basic')
export class Example extends LitElement {
  static get styles() {
    return css`
      vaadin-text-area {
        width: 100%;
      }
    `;
  }

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-text-area label="Description" value="${loremIpsum}"></vaadin-text-area>
      <!-- end::snippet[] -->
    `;
  }
}
