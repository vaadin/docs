import { css, customElement, html, LitElement } from 'lit-element';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('master-content')
export class MasterContent extends LitElement {
  static get styles() {
    return css`
      :host {
        overflow: hidden !important;
        color: var(--lumo-contrast-20pct);
      }

      table {
        border-collapse: collapse;
      }

      th,
      td {
        border-bottom: 1px solid currentColor;
        padding: 0.66rem 1rem;
      }

      th::before,
      td::before {
        content: '\\00a0';
        display: inline-block;
        width: 8rem;
        background: currentColor;
        border-radius: 1em;
        font-size: 0.75rem;
      }

      th {
        background: var(--lumo-contrast-5pct);
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
      <table>
        <thead>
          <tr>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <!-- prettier-ignore -->
        <tbody>
          <tr><td></td><td></td><td></td><td></td><td></td><td></td></tr>
          <tr><td></td><td></td><td></td><td></td><td></td><td></td></tr>
          <tr><td></td><td></td><td></td><td></td><td></td><td></td></tr>
          <tr><td></td><td></td><td></td><td></td><td></td><td></td></tr>
          <tr><td></td><td></td><td></td><td></td><td></td><td></td></tr>
          <tr><td></td><td></td><td></td><td></td><td></td><td></td></tr>
          <tr><td></td><td></td><td></td><td></td><td></td><td></td></tr>
          <tr><td></td><td></td><td></td><td></td><td></td><td></td></tr>
          <tr><td></td><td></td><td></td><td></td><td></td><td></td></tr>
          <tr><td></td><td></td><td></td><td></td><td></td><td></td></tr>
          <tr><td></td><td></td><td></td><td></td><td></td><td></td></tr>
          <tr><td></td><td></td><td></td><td></td><td></td><td></td></tr>
          <tr><td></td><td></td><td></td><td></td><td></td><td></td></tr>
          <tr><td></td><td></td><td></td><td></td><td></td><td></td></tr>
          <tr><td></td><td></td><td></td><td></td><td></td><td></td></tr>
          <tr><td></td><td></td><td></td><td></td><td></td><td></td></tr>
        </tbody>
      </table>
    `;
  }
}
