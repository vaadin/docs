import { html, LitElement, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('my-component')
class MyComponent extends LitElement {
  render(): TemplateResult {
    return html`<h1>My Component</h1>`;
  }

  protected createRenderRoot() {
    return this;
  }
}

export default MyComponent;
