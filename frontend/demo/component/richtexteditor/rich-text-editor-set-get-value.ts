import 'Frontend/demo/init'; // hidden-full-source-line

import { html, LitElement, customElement, internalProperty, query } from 'lit-element';
import '@vaadin/vaadin-rich-text-editor/vaadin-rich-text-editor';
import '@vaadin/vaadin-text-field/vaadin-text-area';

import { applyTheme } from 'Frontend/generated/theme';
import { RichTextEditorElement } from '@vaadin/vaadin-rich-text-editor/vaadin-rich-text-editor';
import { TextAreaElement } from '@vaadin/vaadin-text-field/vaadin-text-area';

@customElement('rich-text-editor-set-get-value')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  @internalProperty()
  private htmlValue = '';

  @query('vaadin-rich-text-editor')
  private richTextEditor!: RichTextEditorElement;

  render() {
    return html`
      <!-- tag::htmlsnippet[] -->
      <vaadin-rich-text-editor
        style="height: 400px;"
        @change="${this.syncHtmlValue}"
      ></vaadin-rich-text-editor>

      <vaadin-text-area
        label="Html Value"
        @change="${(e: CustomEvent) => this.setHtmlValue((e.target as TextAreaElement).value)}"
        placeholder="Type html string here to set it as value to the Rich Text Editor above..."
        style="width: 100%;"
        .value="${this.htmlValue}"
      ></vaadin-text-area>
      <!-- end::htmlsnippet[] -->
    `;
  }

  // tag::snippet[]
  setHtmlValue(htmlValue: string) {
    this.richTextEditor.dangerouslySetHtmlValue(htmlValue);
  }

  syncHtmlValue() {
    this.htmlValue = this.richTextEditor.htmlValue || '';
  }
  // end::snippet[]
}
