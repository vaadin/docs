import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '@vaadin/text-area';
import type { TextAreaValueChangedEvent } from '@vaadin/text-area';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('text-area-basic')
export class Example extends LitElement {
  protected createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
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
        .helperText="${`${this.text.length}/${this.charLimit}`}"
        @value-changed="${(event: TextAreaValueChangedEvent) => {
          this.text = event.detail.value;
        }}"
      ></vaadin-text-area>
      <!-- end::snippet[] -->
    `;
  }
}
