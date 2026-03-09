import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/rich-text-editor';
import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/demo/theme';
import templates from '../../../../src/main/resources/data/templates.json';

@customElement('rich-text-editor-no-border')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    applyTheme(root);
    return root;
  }

  @state()
  private richText = templates.richTextDelta;

  protected override render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-rich-text-editor
        style="height: 400px;"
        theme="no-border"
        .value="${this.richText}"
      ></vaadin-rich-text-editor>
      <!-- end::snippet[] -->
    `;
  }
}
