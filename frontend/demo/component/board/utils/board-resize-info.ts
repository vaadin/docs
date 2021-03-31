import '@vaadin/vaadin-ordered-layout';
import '@vaadin/vaadin-icons/vaadin-icons';
import '@vaadin/vaadin-lumo-styles/icons';
import { applyTheme } from 'Frontend/generated/theme';
import { css, customElement, html, LitElement } from 'lit-element';

@customElement('board-resize-info')
export class BoardResizeInfo extends LitElement {
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
      }
    `;
  }

  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot!);
  }

  render() {
    return html`
      <iron-icon icon="vaadin:info-circle"></iron-icon>
      <span>Drag the split handle to resize the board layout</span>
    `;
  }
}
