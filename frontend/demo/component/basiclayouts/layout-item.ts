import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('layout-item')
export class DetailContent extends LitElement {
  static get styles() {
    return css`
      :host {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: var(--lumo-space-wide-xs);
        background: var(--lumo-primary-color);
        border-radius: var(--lumo-border-radius-m);
        color: var(--lumo-base-color);
      }

      :host([theme~='inactive']) {
        background: var(--lumo-contrast-80pct);
      }
    `;
  }

  render() {
    return html` <slot></slot> `;
  }
}
