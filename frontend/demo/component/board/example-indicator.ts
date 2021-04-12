import '@vaadin/vaadin-ordered-layout/vaadin-vertical-layout';
import '@vaadin/vaadin-icons/vaadin-icons';
import { applyTheme } from 'Frontend/generated/theme';
import { css, customElement, html, LitElement, property } from 'lit-element';

@customElement('example-indicator')
export class ExampleIndicator extends LitElement {
  static get styles() {
    return css`
      .title {
        margin: 0;
        font-size: var(--lumo-font-size-xxs);
        font-weight: 700;
        color: var(--lumo-contrast-50pct);
      }

      .current {
        font-size: var(--lumo-font-size-m);
        font-weight: 700;
      }

      .icon {
        font-size: var(--lumo-font-size-xxs);
      }

      .icon iron-icon {
        --iron-icon-width: var(--lumo-font-size-xxs);
        --iron-icon-height: var(--lumo-font-size-xxs);
      }

      @media (min-width: 1024px) {
        .title {
          font-size: var(--lumo-font-size-xxs);
        }

        .current {
          font-size: var(--lumo-font-size-xl);
        }

        .icon {
          font-size: var(--lumo-font-size-m);
        }

        .icon iron-icon {
          --iron-icon-width: var(--lumo-font-size-xs);
          --iron-icon-height: var(--lumo-font-size-xs);
        }
      }
    `;
  }

  @property()
  public title = 'Unknown';

  @property()
  public current = '0';

  @property()
  public change = 0;

  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  render() {
    let theme;
    let icon;
    let sign;

    if (this.change === 0) {
      theme = '';
      icon = 'circle-thin';
      sign = '±';
    } else if (this.change < 0) {
      theme = 'error';
      icon = 'arrow-down';
      sign = '-';
    } else {
      theme = 'success';
      icon = 'arrow-up';
      sign = '+';
    }

    return html`
      <vaadin-vertical-layout>
        <div class="title">${this.title}</div>
        <div class="current">${this.current}</div>
        <span class="icon" theme="badge ${theme}">
          <iron-icon icon="vaadin:${icon}"></iron-icon>
          <span>${sign}${Math.abs(this.change).toFixed(2)}%</span>
        </span>
      </vaadin-vertical-layout>
    `;
  }
}
