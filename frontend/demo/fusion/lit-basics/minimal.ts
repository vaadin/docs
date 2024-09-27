import { html, LitElement, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('my-component') // <1>
class MyComponent extends LitElement {
  render(): TemplateResult {
    // <2>
    return html`<h1>My component</h1>`;
  }
}

export default MyComponent;
