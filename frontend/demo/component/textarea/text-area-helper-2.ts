import '../../init'; // hidden-full-source-line

import { html, LitElement, customElement, property, css } from 'lit-element';
import { sampleText } from './text-area-sample-text';
import '@vaadin/vaadin-text-field/vaadin-text-area';

@customElement('text-area-helper-2')
export class Example extends LitElement {
  @property({ type: Number }) charCount: number = 0;
  charLimit = 600;

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
      <vaadin-text-area
        label="Description"
        value="${sampleText}"
        @value-changed="${(e: CustomEvent) => (this.charCount = e.detail.value.length)}"
        helper-text="${this.charCount}/${this.charLimit}"
        maxlength="${this.charLimit}"
      >
      </vaadin-text-area>
      <!-- end::snippet[] -->
    `;
  }
}
