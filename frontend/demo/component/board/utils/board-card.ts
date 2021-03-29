import '@vaadin/vaadin-ordered-layout';
import { applyTheme } from 'Frontend/generated/theme';
import { css, customElement, html, LitElement, property } from 'lit-element';

@customElement('board-card')
export class BoardCard extends LitElement {
  static get styles() {
    return css`
      .title {
        margin: 0;
        font-size: 0.8rem;
        font-weight: bold;
        color: var(--lumo-contrast-50pct);
      }

      .current {
        font-size: 2rem;
        font-weight: bold;
      }

      .icon iron-icon {
        --iron-icon-width: 0.8rem;
        --iron-icon-height: 0.8rem;
      }
    `;
  }

  @property()
  public type = '+';

  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot!);
  }

  render() {
    let theme;
    let icon;

    if (this.type === '+') {
      theme = 'success';
      icon = 'arrow-up';
    } else if (this.type === '±') {
      theme = '';
      icon = 'circle-thin';
    } else {
      theme = 'error';
      icon = 'arrow-down';
    }

    return html`
      <vaadin-vertical-layout>
        <slot class="title"></slot>
        <slot class="current" name="current"></slot>
        <span class="icon" theme="badge ${theme}">
          <iron-icon icon="vaadin:${icon}"></iron-icon>
          <span>${this.type}<slot name="difference"></slot></span>
        </span>
      </vaadin-vertical-layout>
    `;
  }
}
