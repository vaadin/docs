import { html, LitElement, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('my-component')
class MyComponent extends LitElement {
  render(): TemplateResult {
    return html`<h1>My Component</h1>`;
  }
}

export default MyComponent;
