import '../../init'; // hidden-full-source-line

import { html, LitElement, customElement, css } from 'lit-element';
import '@vaadin/vaadin-board/vaadin-board';
import { applyTheme } from 'generated/theme';

@customElement('board-basic')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  // tag::snippet[]
  render() {
    return html`
      <vaadin-board>
        <vaadin-board-row>
          <div class="cell">Cell 1</div>
          <div class="cell">Cell 2</div>
          <div class="cell">Cell 3</div>
          <div class="cell">Cell 4</div>
        </vaadin-board-row>
      </vaadin-board>
    `;
  }
  // end::snippet[]
  static get styles() {
    return css`
      .cell {
        padding: 1em;
        text-align: center;
        color: white;
      }
      .cell:nth-child(1) {
        background: #003e53;
      }
      .cell:nth-child(2) {
        background: #00506b;
      }
      .cell:nth-child(3) {
        background: #006c90;
      }
      .cell:nth-child(4) {
        background: #0090c0;
      }
    `;
  }
}
