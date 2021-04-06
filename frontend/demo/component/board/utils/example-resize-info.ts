import '@vaadin/vaadin-icons/vaadin-icons';
import { applyTheme } from 'Frontend/generated/theme';
import { css, customElement, html, LitElement } from 'lit-element';

@customElement('example-resize-info')
export class ExampleResizeInfo extends LitElement {
  static get styles() {
    return css`
      :host {
        display: flex;
        align-items: center;
        margin-inline-start: var(--lumo-space-m);
      }

      iron-icon {
        --iron-icon-width: var(--lumo-font-size-m);
        --iron-icon-height: var(--lumo-font-size-m);

        color: var(--lumo-primary-color);
        flex-shrink: 0;
      }

      span {
        margin-inline-start: var(--lumo-space-m);
        flex: 1;
        font-size: var(--lumo-font-size-xs);
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
      <iron-icon icon="vaadin:info-circle"></iron-icon>
      <span>Resize with the split handle</span>
    `;
  }
}
