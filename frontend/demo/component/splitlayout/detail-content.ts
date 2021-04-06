import { css, customElement, html, LitElement } from 'lit-element';

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
        box-sizing: border-box;
      }

      .field {
        display: flex;
        flex-flow: column nowrap;
        margin: var(--lumo-space-wide-l);
        pointer-events: none;
      }

      label {
        width: 6rem;
        background: currentColor;
        border-radius: calc(var(--lumo-size-m) / 2);
        height: var(--lumo-font-size-xxs);
      }

      input {
        background: var(--lumo-contrast-10pct);
        border-radius: var(--lumo-border-radius-s);
        padding: var(--lumo-space-s) 0;
        border: none;
        margin-top: var(--lumo-space-s);
      }
    `;
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
