import { css } from 'lit-element';

export default css`
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
