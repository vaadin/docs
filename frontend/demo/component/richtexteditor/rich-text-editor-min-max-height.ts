import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/rich-text-editor';
import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/demo/theme';
import templates from '../../../../src/main/resources/data/templates.json';

@customElement('rich-text-editor-min-max-height')
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
        style="min-height:200px; max-height: 400px;"
        .value="${this.richText}"
      ></vaadin-rich-text-editor>
      <!-- end::snippet[] -->
    `;
  }
}
