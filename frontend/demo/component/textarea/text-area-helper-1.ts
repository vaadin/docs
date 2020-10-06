import '../../init'; // hidden-full-source-line

import { html, LitElement, customElement, property } from 'lit-element';
import '@vaadin/vaadin-text-field/vaadin-text-area';

@customElement('text-area-helper-1')
export class Example extends LitElement {
  @property({ type: Number }) charCount: number = 0;
  charLimit = 140;

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-text-area
        label="Comment"
        value="Great job. This is excellent!"
        @value-changed="${(e: CustomEvent) => (this.charCount = e.detail.value.length)}"
        helper-text="${this.charCount}/${this.charLimit}"
        maxlength="${this.charLimit}"
      >
      </vaadin-text-area>
      <!-- end::snippet[] -->
    `;
  }
}
