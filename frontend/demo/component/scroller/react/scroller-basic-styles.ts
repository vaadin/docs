import { css } from 'lit';

const styles = css`
  #container {
    align-items: stretch;
    border: 1px solid var(--lumo-contrast-20pct);
    max-width: 100%;
    height: 400px;
    width: 360px;
  }

  header {
    align-items: center;
    display: flex;
    border-bottom: 1px solid var(--lumo-contrast-20pct);
    padding: var(--lumo-space-m);
  }

  header h2 {
    margin: 0;
  }

  header vaadin-icon {
    box-sizing: border-box;
    height: var(--lumo-icon-size-m);
    margin-right: var(--lumo-space-m);
    padding: calc(var(--lumo-space-xs) / 2);
    width: var(--lumo-icon-size-m);
  }

  footer {
    padding: var(--lumo-space-wide-m);
  }

  footer vaadin-button:first-child {
    margin-right: var(--lumo-space-s);
  }
`;

export default styles;
