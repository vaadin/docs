import '@vaadin/vaadin-ordered-layout';
import '@vaadin/vaadin-icons/vaadin-icons';
import '@vaadin/vaadin-lumo-styles/icons';
import { applyTheme } from 'Frontend/generated/theme';
import { css, customElement, html, LitElement, property } from 'lit-element';

@customElement('board-card')
export class BoardCard extends LitElement {
  static get styles() {
    return css`
      .title {
        margin: 0;
        font-size: var(--lumo-font-size-xs);
        font-weight: 700;
        color: var(--lumo-contrast-50pct);
      }

      .current {
        font-size: var(--lumo-font-size-xl);
        font-weight: 700;
      }

      .icon iron-icon {
        --iron-icon-width: var(--lumo-font-size-xs);
        --iron-icon-height: var(--lumo-font-size-xs);
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
