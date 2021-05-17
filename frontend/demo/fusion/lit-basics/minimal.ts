import { html, LitElement, TemplateResult } from 'lit;
import { customElement } from 'lit/decorators.js';

@customElement('minimal-view')
class MinimalView extends LitElement {
  render(): TemplateResult {
    return html`<h1>My View</h1>`;
  }
}

export default MinimalView;
