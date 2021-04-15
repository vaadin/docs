import 'Frontend/demo/init'; // hidden-full-source-line

import { html, LitElement, customElement, internalProperty, query } from 'lit-element';
import '@vaadin/vaadin-rich-text-editor/vaadin-rich-text-editor';
import '@vaadin/vaadin-text-field/vaadin-text-area';

import { applyTheme } from 'Frontend/generated/theme';
import {
  RichTextEditorElement,
  RichTextEditorHtmlValueChanged,
} from '@vaadin/vaadin-rich-text-editor/vaadin-rich-text-editor';
import { TextFieldValueChanged } from '@vaadin/vaadin-text-field';

@customElement('rich-text-editor-set-get-value')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  @internalProperty()
  htmlValue = '<p>Html value of the editor</p>';

  @query('vaadin-rich-text-editor')
  richTextEditor?: RichTextEditorElement;

  render() {
    return html`
      <!-- tag::htmlsnippet[] -->
      <vaadin-rich-text-editor
        style="height: 400px;"
        @html-value-changed="${(e: RichTextEditorHtmlValueChanged) =>
          (this.htmlValue = e.detail.value)}"
      ></vaadin-rich-text-editor>

      <vaadin-text-area
        @value-changed="${(e: TextFieldValueChanged) => this.setHtmlValue(e.detail.value)}"
        placeholder="Type html string here to set it as value to the Rich Text Editor above..."
        style="width: 100%;"
      ></vaadin-text-area>

      <div><b>Html value of the editor:</b> ${this.htmlValue}</div>
      <!-- end::htmlsnippet[] -->
    `;
  }

  // tag::snippet[]
  setHtmlValue(htmlValue: string) {
    this.richTextEditor?.dangerouslySetHtmlValue(htmlValue);
  }
  // end::snippet[]
}
