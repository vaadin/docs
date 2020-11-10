import '../../init'; // hidden-full-source-line

import { html, LitElement, customElement, property, css } from 'lit-element';
import '@vaadin/vaadin-text-field/vaadin-text-area';
import { loremIpsum } from '../../../../src/main/resources/data/templates.json';

@customElement('text-area-helper-2')
export class Example extends LitElement {
  // tag::snippet[]
  private charLimit = 600;

  @property()
  private text = loremIpsum;

  static get styles() {
    return css`
      vaadin-text-area {
        width: 100%;
      }
    `;
  }

  render() {
    return html`
      <vaadin-text-area
        label="Description"
        .maxlength=${this.charLimit}
        .value=${this.text}
        @value-changed="${(e: CustomEvent) => (this.text = e.detail.value)}"
        .helperText=${`${this.text.length}/${this.charLimit}`}
      >
      </vaadin-text-area>
    `;
  }
  // end::snippet[]
}
