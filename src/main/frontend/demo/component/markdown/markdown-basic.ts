import '@vaadin/markdown';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('markdown-basic')
export class MarkdownBasic extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  protected override render() {
    // tag::snippet[]
    const markdownText = `
## Rich Text Formatting

You can create **bold text**, *italicized text*, and \`inline code\` with simple Markdown syntax.
You can also ~~strike through~~ text when needed.

## Lists

### Ordered List:
1. First item
2. Second item
3. Third item with **bold text**

### Unordered List:
- Fruits
  - Apples 🍎
  - Bananas 🍌
  - Oranges 🍊
- Vegetables
  - Carrots
  - Broccoli

## Links & Quotes

> Markdown is a lightweight markup language that you can use to add formatting elements to plaintext text documents.

[Visit Vaadin website](https://vaadin.com) | [Learn more about Markdown](https://www.markdownguide.org/)
    `;

    return html`<vaadin-markdown .content=${markdownText}></vaadin-markdown>`;
    // end::snippet[]
  }
}
