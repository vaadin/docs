import 'Frontend/demo/init'; // hidden-source-line

import { css, html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '@vaadin/text-area';
import type { TextAreaValueChangedEvent } from '@vaadin/text-area';
import templates from '../../../../src/main/resources/data/templates.json';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('text-area-helper-2')
export class Example extends LitElement {
  static override styles = css`
    vaadin-text-area {
      width: 100%;
    }
  `;

  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  // tag::snippet[]
  private charLimit = 600;

  @state()
  private text = templates.loremIpsum;

  protected override render() {
    return html`
      <vaadin-text-area
        label="Description"
        .maxlength="${this.charLimit}"
        .value="${this.text}"
        .helperText="${`${this.text.length}/${this.charLimit}`}"
        @value-changed="${(event: TextAreaValueChangedEvent) => {
          this.text = event.detail.value;
        }}"
      ></vaadin-text-area>
    `;
  }
  // end::snippet[]
}
