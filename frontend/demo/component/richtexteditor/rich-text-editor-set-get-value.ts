import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';
import '@vaadin/vaadin-rich-text-editor/vaadin-rich-text-editor';
import '@vaadin/vaadin-text-field/vaadin-text-area';

import { applyTheme } from 'Frontend/generated/theme';
import { RichTextEditorElement } from '@vaadin/vaadin-rich-text-editor/vaadin-rich-text-editor';
import { TextArea } from '@vaadin/vaadin-text-field/vaadin-text-area';

@customElement('rich-text-editor-set-get-value')
export class Example extends LitElement {
  protected createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  @state()
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
        @change="${(e: CustomEvent) => this.setHtmlValue((e.target as TextArea).value)}"
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
