import { css } from 'lit';

const styles = css`
  .notification-position-example,
  :host(.notification-position-example) {
    display: grid !important;
    grid-gap: 1em;
    grid-template-columns: 1fr 1fr 1fr;
  }

  .notification-position-example vaadin-button,
  :host(.notification-position-example) vaadin-button {
    margin: 0;
    max-width: 100%;
  }

  .notification-position-example vaadin-button:nth-child(2),
  .notification-position-example vaadin-button:nth-child(6),
  :host(.notification-position-example) vaadin-button:nth-child(2),
  :host(.notification-position-example) vaadin-button:nth-child(6) {
    margin-inline-end: auto;
  }

  .notification-position-example vaadin-button:nth-child(3),
  .notification-position-example vaadin-button:nth-child(5),
  .notification-position-example vaadin-button:nth-child(7),
  :host(.notification-position-example) vaadin-button:nth-child(3),
  :host(.notification-position-example) vaadin-button:nth-child(5),
  :host(.notification-position-example) vaadin-button:nth-child(7) {
    margin: 0 auto;
  }

  .notification-position-example vaadin-button:nth-child(4),
  .notification-position-example vaadin-button:nth-child(8),
  :host(.notification-position-example) vaadin-button:nth-child(4),
  :host(.notification-position-example) vaadin-button:nth-child(8) {
    margin-inline-start: auto;
  }

  .notification-position-example vaadin-button:nth-child(1),
  .notification-position-example vaadin-button:nth-child(5),
  .notification-position-example vaadin-button:nth-child(9),
  :host(.notification-position-example) vaadin-button:nth-child(1),
  :host(.notification-position-example) vaadin-button:nth-child(5),
  :host(.notification-position-example) vaadin-button:nth-child(9) {
    grid-column-start: 1;
    grid-column-end: 4;
  }
`;

export default styles;
