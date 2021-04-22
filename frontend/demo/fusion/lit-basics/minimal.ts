import { customElement, html, LitElement, TemplateResult } from 'lit-element';

@customElement('minimal-view')
class MinimalView extends LitElement {
  render(): TemplateResult {
    return html`<h1>My View</h1>`;
  }
}

export default MinimalView;
