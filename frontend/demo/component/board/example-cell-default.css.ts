import { css } from 'lit-element';

export default css`
  .cell {
    padding: 1em 0.3em;
    text-align: center;
    color: white;
    white-space: nowrap;
  }

  @media (min-width: 1024px) {
    .cell {
      padding: 1em;
    }
  }
`;
