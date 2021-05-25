import 'Frontend/demo/init'; // hidden-source-line

import { css, html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '@vaadin/vaadin-text-field/vaadin-text-area';
import { loremIpsum } from '../../../../src/main/resources/data/templates.json';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('text-area-helper-2')
export class Example extends LitElement {
  protected createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  // tag::snippet[]
  private charLimit = 600;

  @state()
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
        .maxlength="${this.charLimit}"
        .value="${this.text}"
        @value-changed="${(e: CustomEvent) => (this.text = e.detail.value)}"
        .helperText="${`${this.text.length}/${this.charLimit}`}"
      >
      </vaadin-text-area>
    `;
  }
  // end::snippet[]
}
