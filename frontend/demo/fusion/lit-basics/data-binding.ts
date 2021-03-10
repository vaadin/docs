import {
  customElement,
  html,
  LitElement,
  property,
  internalProperty,
  TemplateResult
} from 'lit-element';

@customElement('example-template-binding-view')
class ExampleTemplateBindingView extends LitElement {
  @property() message = '';
  @property() name = '';

  @internalProperty() active = false;

  render(): TemplateResult {
    return html`
      <example-template-header ?active=${this.active} name=${this.name} .message=${this.message}>
        <button @click=${this.onClick}>Toggle</button>
      </example-template-header>
    `;
  }

  // It is not necessary to bind the property in the constructor because of the
  // LitElement design.
  private onClick() {
    this.active = !this.active;
  }
}

export default ExampleTemplateBindingView;
