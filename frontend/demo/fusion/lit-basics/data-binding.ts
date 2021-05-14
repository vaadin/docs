import {
  html,
  LitElement,
  TemplateResult,
} from 'lit';

import {customElement, property, state} from `lit/decorators.js`;

@customElement('data-binding-view')
class DataBindingView extends LitElement {
  @property() message = '';
  @property() name = '';

  @state() active = false;

  render(): TemplateResult {
    return html`
      <example-template-header
        ?active="${this.active}"
        name="${this.name}"
        .message="${this.message}"
      >
        <button @click="${this._onClick}">Toggle</button>
      </example-template-header>
    `;
  }

  private _onClick() {
    this.active = !this.active;
  }
}

export default DataBindingView;
