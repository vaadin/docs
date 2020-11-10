import '../../init'; // hidden-full-source-line

import { html, LitElement, customElement, property } from 'lit-element';
import '@vaadin/vaadin-text-field/vaadin-text-area';

@customElement('text-area-basic')
export class Example extends LitElement {
  private charLimit = 140;

  @property()
  private text = 'Great job. This is excellent!';

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-text-area
        label="Comment"
        .maxlength=${this.charLimit}
        .value=${this.text}
        @value-changed="${(e: CustomEvent) => (this.text = e.detail.value)}"
        .helperText=${`${this.text.length}/${this.charLimit}`}
      ></vaadin-text-area>
      <!-- end::snippet[] -->
    `;
  }
}
