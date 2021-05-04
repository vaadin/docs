import { css } from 'lit-element';

export default css`
  :host {
    --board-blue-10: #0090c0;
    --board-blue-20: #006c90;
    --board-blue-30: #00506b;
    --board-blue-40: #003e53;
  }

  .color:nth-child(1) {
    background: var(--board-blue-40);
  }

  .color:nth-child(2) {
    background: var(--board-blue-30);
  }

  .color:nth-child(3) {
    background: var(--board-blue-20);
  }

  .color:nth-child(4) {
    background: var(--board-blue-10);
  }
`;
