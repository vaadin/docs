import '../../init'; // hidden-full-source-line

import { css, html, internalProperty, LitElement } from 'lit-element';
import '@vaadin/vaadin-notification/vaadin-notification';

export class Example extends LitElement {
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
