import '../../init'; // hidden-full-source-line

import { html, LitElement, customElement, css } from 'lit-element';
import { sampleText } from './text-area-sample-text';
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
      <vaadin-text-area label="Description" value="${sampleText}"></vaadin-text-area>
      <!-- end::snippet[] -->
    `;
  }
}
