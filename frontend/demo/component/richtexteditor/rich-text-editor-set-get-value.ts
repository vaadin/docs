import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';
import '@vaadin/rich-text-editor';
import type { RichTextEditor, RichTextEditorChangeEvent } from '@vaadin/rich-text-editor';
import '@vaadin/text-area';
import type { TextAreaChangeEvent } from '@vaadin/text-area';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('rich-text-editor-set-get-value')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  @state()
  private htmlValue = '';

  @query('vaadin-rich-text-editor')
  private richTextEditor!: RichTextEditor;

  protected override render() {
    return html`
      <!-- tag::htmlsnippet[] -->
      <vaadin-rich-text-editor
        style="height: 400px;"
        @change="${(event: RichTextEditorChangeEvent) => {
          this.htmlValue = event.target.htmlValue ?? '';
        }}"
      ></vaadin-rich-text-editor>

      <vaadin-text-area
        label="Html Value"
        @change="${(e: TextAreaChangeEvent) => this.setHtmlValue(e.target.value)}"
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
  // end::snippet[]
}
