import { css } from 'lit';

const styles = css`
  .side-nav-sample {
    overflow: hidden;
    background: var(--lumo-shade-5pct, rgba(0, 0, 0, 0.2));
  }

  .side-nav-sample > * {
    background: var(--vaadin-background-color);
    box-shadow: var(--lumo-box-shadow-s, 0 8px 24px -4px rgba(0, 0, 0, 0.3));
    padding: var(--vaadin-padding-m);
    width: 15em;
  }
`;

export default styles;
