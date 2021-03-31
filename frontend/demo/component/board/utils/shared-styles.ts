import { css } from 'lit-element';

export const boardBorderCSS = css`
  :host {
    --board-border: 1px solid var(--lumo-contrast-10pct);
  }
`;

export const boardCellColorsCSS = css`
  :host {
    --board-blue-10: #0090c0;
    --board-blue-20: #006c90;
    --board-blue-30: #00506b;
    --board-blue-40: #003e53;
  }
`;

export const boardExampleBreakpointsCSS = css`
  :host {
    --vaadin-board-width-small: 300px;
    --vaadin-board-width-medium: 400px;
  }
`;

export const boardCellCSS = css`
  .cell {
    padding: 1em;
    text-align: center;
    color: white;
  }

  .cell:nth-child(1) {
    background: var(--board-blue-40);
  }

  .cell:nth-child(2) {
    background: var(--board-blue-30);
  }

  .cell:nth-child(3) {
    background: var(--board-blue-20);
  }

  .cell:nth-child(4) {
    background: var(--board-blue-10);
  }
`;
