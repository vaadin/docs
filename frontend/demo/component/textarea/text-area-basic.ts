import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '@vaadin/vaadin-text-field/vaadin-text-area';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('text-area-basic')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  private charLimit = 140;

  @state()
  private text = 'Great job. This is excellent!';

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-text-area
        label="Comment"
        .maxlength="${this.charLimit}"
        .value="${this.text}"
        @value-changed="${(e: CustomEvent) => (this.text = e.detail.value)}"
        .helperText="${`${this.text.length}/${this.charLimit}`}"
      ></vaadin-text-area>
      <!-- end::snippet[] -->
    `;
  }
}
