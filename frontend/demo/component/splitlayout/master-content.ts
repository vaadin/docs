import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('master-content')
export class MasterContent extends LitElement {
  protected override createRenderRoot() {
    return this;
  }

  connectedCallback() {
    super.connectedCallback();
    this.classList.add('master-content');
  }

  protected override render() {
    return [...Array(16)].map(
      () =>
        html`<div class="row">
          <div class="col"></div>
          <div class="col"></div>
          <div class="col"></div>
          <div class="col"></div>
          <div class="col"></div>
          <div class="col"></div>
        </div>`
    );
  }
}
