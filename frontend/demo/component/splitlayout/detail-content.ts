import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('detail-content')
export class DetailContent extends LitElement {
  static override styles = css`
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
      border-radius: calc(2.25rem / 2);
      height: var(--lumo-font-size-xxs);
    }

    input {
      background: var(--lumo-contrast-10pct);
      border-radius: var(--lumo-border-radius-s);
      padding: 0.5rem 0;
      border: none;
      margin-top: 0.5rem;
    }
  `;

  protected override render() {
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
