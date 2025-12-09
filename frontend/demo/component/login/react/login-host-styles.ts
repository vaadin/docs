import { css } from 'lit';

export const loginHostStyles = css`
  :host {
    background-color: var(--lumo-contrast-5pct, rgba(0, 0, 0, 0.2));
    display: flex !important;
    justify-content: center;
    padding: var(--vaadin-padding-l);
  }

  vaadin-login-form {
    background-color: var(--vaadin-background-color);
  }
`;
