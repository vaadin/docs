import { customElement, html, LitElement, TemplateResult } from 'lit-element';

@customElement('example-template-view')
class ExampleTemplateView extends LitElement {
  render(): TemplateResult {
    return html`
      <h1>My View</h1>
    `;
  }
}

export default ExampleTemplateView;
