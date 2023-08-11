import { css } from 'lit';

const styles = css`
  .side-nav-sample {
    overflow: hidden;
    background: var(--lumo-shade-5pct);
  }

  .side-nav-sample > * {
    background: var(--lumo-base-color);
    box-shadow: var(--lumo-box-shadow-s);
    padding: var(--lumo-space-m);
    width: 15em;
  }
`;

export default styles;
