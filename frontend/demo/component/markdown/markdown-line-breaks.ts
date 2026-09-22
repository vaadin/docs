import '@vaadin/markdown';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/demo/theme';

@customElement('markdown-line-breaks')
export class MarkdownLineBreaks extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    applyTheme(root);
    return root;
  }

  protected override render() {
    // tag::snippet[]
    const markdownText = `
Hi Maria,
Your order shipped this morning.
It should arrive by Thursday.

Best regards,
Tom
    `;

    return html`<vaadin-markdown line-breaks .content=${markdownText}></vaadin-markdown>`;
    // end::snippet[]
  }
}
