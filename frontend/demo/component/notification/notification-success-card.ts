import '../../init'; // hidden-full-source-line

import { css, html, internalProperty, LitElement } from 'lit-element';
import '@vaadin/vaadin-notification/vaadin-notification';
import { applyTheme } from 'themes/theme-generated.js';

export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom application theme to the view.
    // This is only supported if your app uses a custom theme.
    applyTheme(this.shadowRoot);
  }

  @internalProperty()
  private closing = false;

  static getStyles() {
    return css`
      vaadin-notification-card[closing] {
        transition: all 600ms;
        transform: translateY(300%);
      }
    `;
  }

  render() {
    return html`
      <vaadin-notification-card theme="success" style="display: block;" ?closing=${this.closing}>
        <div style="display: flex; justify-content: space-between; width:100%;">
          <span>Application submitted!</span><span @click=${this.hideCard}>X</span>
        </div>
      </vaadin-notification-card>
    `;
  }

  hideCard() {
    this.closing = true;
  }
}
