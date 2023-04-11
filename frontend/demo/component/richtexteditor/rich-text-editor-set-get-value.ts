import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';
import '@vaadin/rich-text-editor';
import type {
  RichTextEditor,
  RichTextEditorHtmlValueChangedEvent,
  RichTextEditorValueChangedEvent,
} from '@vaadin/rich-text-editor';
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

  @state()
  private deltaValue = '';

  @query('vaadin-rich-text-editor')
  private richTextEditor!: RichTextEditor;

  protected override render() {
    return html`
      <!-- tag::htmlsnippet[] -->
      <vaadin-rich-text-editor
        style="height: 400px;"
        .value="${this.deltaValue}"
        @value-changed="${(event: RichTextEditorValueChangedEvent) => {
          this.deltaValue = event.detail.value;
        }}"
        @html-value-changed="${(event: RichTextEditorHtmlValueChangedEvent) => {
          this.htmlValue = event.detail.value;
        }}"
      ></vaadin-rich-text-editor>

      <vaadin-text-area
        label="HTML Value"
        helper-text="Shows the HTML representation of the edited document. You can also modify or paste HTML here to see the changes reflected in the editor above. Note that you have to leave (blur) this field in order for the editor to update."
        style="width: 100%;"
        .value="${this.htmlValue}"
        @change="${(e: TextAreaChangeEvent) => this.setHtmlValue(e.target.value)}"
      ></vaadin-text-area>

      <vaadin-text-area
        label="Delta Value"
        helper-text="Shows the Delta representation of the edited document. You can also modify or paste the Delta JSON here to see the changes reflected in the editor above. Note that you have to leave (blur) this field in order for the editor to update."
        style="width: 100%;"
        .value="${this.deltaValue}"
        @change="${(e: TextAreaChangeEvent) => {
          this.deltaValue = e.target.value;
        }}"
      ></vaadin-text-area>
      <!-- end::htmlsnippet[] -->
    `;
  }

  // tag::snippet[]
  setHtmlValue(htmlValue: string) {
    this.htmlValue = htmlValue;
    this.richTextEditor.dangerouslySetHtmlValue(htmlValue);
  }

  // end::snippet[]
}
