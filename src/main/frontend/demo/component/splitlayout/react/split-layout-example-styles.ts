import { css } from 'lit';

const styles = css`
  .master-content {
    overflow: hidden !important;
    color: var(--lumo-contrast-20pct);
  }

  table {
    border-collapse: collapse;
  }

  th,
  td {
    border-bottom: 1px solid currentColor;
    padding: var(--lumo-space-wide-m);
  }

  th::before,
  td::before {
    content: '\\00a0';
    display: inline-block;
    width: 8rem;
    background: currentColor;
    border-radius: calc(var(--lumo-size-m) / 2);
    font-size: var(--lumo-font-size-xxs);
  }

  th {
    background: var(--lumo-contrast-5pct);
  }

  .detail-content {
    overflow: hidden !important;
    color: var(--lumo-contrast-20pct);
  }

  .form {
    display: flex;
    flex-flow: row wrap;
    align-content: flex-start;
    box-sizing: border-box;
  }

  .field {
    display: flex;
    flex-flow: column nowrap;
    margin: var(--lumo-space-wide-l);
    pointer-events: none;
  }

  label {
    width: 6rem;
    background: currentColor;
    border-radius: calc(var(--lumo-size-m) / 2);
    height: var(--lumo-font-size-xxs);
  }

  input {
    background: var(--lumo-contrast-10pct);
    border-radius: var(--lumo-border-radius-s);
    padding: var(--lumo-space-s) 0;
    border: none;
    margin-top: var(--lumo-space-s);
  }
`;

export default styles;
