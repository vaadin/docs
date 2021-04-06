import { css, customElement, html, LitElement } from 'lit-element';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('detail-content')
export class DetailContent extends LitElement {
  static get styles() {
    return css`
      :host {
        overflow: hidden !important;
        color: var(--lumo-contrast-20pct);
      }

      .form {
        display: flex;
        flex-flow: row wrap;
        align-content: flex-start;
        padding: 1rem 1.5rem;
        box-sizing: border-box;
      }

      .field {
        display: flex;
        flex-flow: column nowrap;
        margin: 1rem 1rem 0.5rem 0;
        pointer-events: none;
      }

      label {
        width: 6rem;
        background: currentColor;
        border-radius: 1em;
        height: 0.75rem;
      }

      input {
        background: var(--lumo-contrast-10pct);
        border-radius: 0.2em;
        padding: 0.5rem 0;
        border: none;
        margin-top: 0.5rem;
      }
    `;
  }

  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  render() {
    return html`
      <div class="form">
        <div class="field"><label></label><input type="text" /></div>
        <div class="field"><label></label><input type="text" /></div>
        <div class="field"><label></label><input type="text" /></div>
        <div class="field"><label></label><input type="text" /></div>
        <div class="field"><label></label><input type="text" /></div>
        <div class="field"><label></label><input type="text" /></div>
        <div class="field"><label></label><input type="text" /></div>
        <div class="field"><label></label><input type="text" /></div>
        <div class="field"><label></label><input type="text" /></div>
        <div class="field"><label></label><input type="text" /></div>
      </div>
    `;
  }
}
