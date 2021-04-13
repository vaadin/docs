import { css } from 'lit-element';

export default css`
  :host {
    --vaadin-board-width-small: 150px;
    --vaadin-board-width-medium: 220px;
  }

  @media (min-width: 1024px) {
    :host {
      --vaadin-board-width-small: 300px;
      --vaadin-board-width-medium: 400px;
    }
  }
`;
