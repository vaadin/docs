import { LitElement, html, customElement, TemplateResult } from 'lit-element';

@customElement('my-view')
class MyView extends LitElement {
  render(): TemplateResult {
    return html`<h1>My View</h1>`;
  }
}

export default MyView;
