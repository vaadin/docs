import '../../init'; // hidden-full-source-line

import { html, LitElement, customElement, internalProperty } from 'lit-element';
import '@vaadin/vaadin-rich-text-editor/vaadin-rich-text-editor';

import templates from '../../../../src/main/resources/data/templates.json';
import { applyTheme } from 'themes/theme-generated.js';

// tag::snippet[]
@customElement('rich-text-editor-basic')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom application theme to the view.
    // This is only supported if your app uses a custom theme.
    applyTheme(this.shadowRoot);
  }

  @internalProperty()
  private richText = templates.richTextDelta;

  render() {
    return html`
      <vaadin-rich-text-editor
        style="max-height: 400px"
        value=${this.richText}
      ></vaadin-rich-text-editor>
    `;
  }
}
// end::snippet[]
