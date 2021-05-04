import 'Frontend/demo/init'; // hidden-source-line

import '@vaadin/vaadin-board/vaadin-board';
import { html, LitElement, customElement, css } from 'lit-element';
import { applyTheme } from 'Frontend/generated/theme';
import defaultColorsCSS from './example-color-default.css';
import defaultCellCSS from './example-cell-default.css';
import defaultBreakpointCSS from './example-breakpoint-default.css';

@customElement('board-column-span')
export class Example extends LitElement {
  static get styles() {
    return [
      defaultBreakpointCSS,
      defaultCellCSS,
      defaultColorsCSS,
      css`
        :host {
          --board-inner-border: 1px dashed white;
        }

        vaadin-board {
          padding: var(--lumo-space-m) 0;
        }

        .cell {
          background: var(--board-blue-20);
        }

        .cell[board-cols='3'] {
          background: var(--board-blue-40);
        }

        .cell[board-cols='2'] {
          background: var(--board-blue-30);
        }

        .cell:not(:last-child) {
          border-inline-end: var(--board-inner-border);
        }

        vaadin-board-row:not(:last-child) .cell {
          border-block-end: var(--board-inner-border);
        }
      `,
    ];
  }

  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-board>
        <vaadin-board-row>
          <div class="cell" board-cols="2">Span 2</div>
          <div class="cell">Span 1</div>
          <div class="cell">Span 1</div>
        </vaadin-board-row>
        <vaadin-board-row>
          <div class="cell">Span 1</div>
          <div class="cell" board-cols="2">Span 2</div>
          <div class="cell">Span 1</div>
        </vaadin-board-row>
        <vaadin-board-row>
          <div class="cell">Span 1</div>
          <div class="cell">Span 1</div>
          <div class="cell" board-cols="2">Span 2</div>
        </vaadin-board-row>
      </vaadin-board>
      <vaadin-board>
        <vaadin-board-row>
          <div class="cell" board-cols="3">Span 3</div>
          <div class="cell">Span 1</div>
        </vaadin-board-row>
        <vaadin-board-row>
          <div class="cell">Span 1</div>
          <div class="cell" board-cols="3">Span 3</div>
        </vaadin-board-row>
      </vaadin-board>
      <vaadin-board>
        <vaadin-board-row>
          <div class="cell" board-cols="2">Span 2</div>
          <div class="cell">Span 1</div>
        </vaadin-board-row>
        <vaadin-board-row>
          <div class="cell">Span 1</div>
          <div class="cell" board-cols="2">Span 2</div>
        </vaadin-board-row>
      </vaadin-board>
      <!-- end::snippet[] -->
    `;
  }
}
