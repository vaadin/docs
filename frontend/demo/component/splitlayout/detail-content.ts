import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('detail-content')
export class DetailContent extends LitElement {
  protected override createRenderRoot() {
    return this;
  }

  connectedCallback() {
    super.connectedCallback();
    this.classList.add('detail-content');
  }

  protected override render() {
    return [...Array(10)].map(
      () => html`
        <div class="field">
          <label></label>
          <input type="text" />
        </div>
      `
    );
  }
}
