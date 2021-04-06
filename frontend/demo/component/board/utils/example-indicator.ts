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
  public title = 'Unknown';

  @property()
  public current = '0';

  @property()
  public change = '±0.0%';

  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  render() {
    let theme;
    let icon;

    if (this.change[0] === '+') {
      theme = 'success';
      icon = 'arrow-up';
    } else if (this.change[0] === '-') {
      theme = 'error';
      icon = 'arrow-down';
    } else {
      theme = '';
      icon = 'circle-thin';
    }

    return html`
      <vaadin-vertical-layout>
        <div class="title">${this.title}</div>
        <div class="current">${this.current}</div>
        <span class="icon" theme="badge ${theme}">
          <iron-icon icon="vaadin:${icon}"></iron-icon>
          <span>${this.change}</span>
        </span>
      </vaadin-vertical-layout>
    `;
  }
}
