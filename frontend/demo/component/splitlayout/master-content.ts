import { css, customElement, html, LitElement } from 'lit-element';

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
        padding: var(--lumo-space-wide-m);
      }

      th::before,
      td::before {
        content: '\\00a0';
        display: inline-block;
        width: 8rem;
        background: currentColor;
        border-radius: calc(var(--lumo-size-m) / 2);
        font-size: var(--lumo-font-size-xxs);
      }

      th {
        background: var(--lumo-contrast-5pct);
      }
    `;
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
