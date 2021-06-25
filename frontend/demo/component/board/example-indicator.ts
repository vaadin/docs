import { applyTheme } from 'Frontend/generated/theme';
import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators';
import '@vaadin/vaadin-ordered-layout/vaadin-vertical-layout';
import '@vaadin/vaadin-icon/vaadin-icon';
import '@vaadin/vaadin-icons/vaadin-iconset';

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

      .icon vaadin-icon {
        --vaadin-icon-width: var(--lumo-font-size-xxs);
        --vaadin-icon-height: var(--lumo-font-size-xxs);
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

        .icon vaadin-icon {
          --vaadin-icon-width: var(--lumo-font-size-xs);
          --vaadin-icon-height: var(--lumo-font-size-xs);
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

  protected createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
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
          <vaadin-icon icon="vaadin:${icon}"></vaadin-icon>
          <span>${sign}${Math.abs(this.change).toFixed(2)}%</span>
        </span>
      </vaadin-vertical-layout>
    `;
  }
}
