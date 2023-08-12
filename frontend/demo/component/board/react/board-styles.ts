import { css } from 'lit';

const boardStyles = css`
  /****************************
 * board basic
 ****************************/
  .basic-board,
  :host(.basic-board) {
    --board-border: 1px solid var(--lumo-contrast-10pct);
    --vaadin-board-width-small: 200px;
    --vaadin-board-width-medium: 400px;
  }

  .basic-board vaadin-board-row:not(:last-child),
  :host(.basic-board) vaadin-board-row:not(:last-child) {
    border-block-end: var(--board-border);
  }

  .basic-board .example-indicator,
  :host(.basic-board) .example-indicator {
    padding: var(--lumo-space-m);
  }

  .basic-board .example-indicator:not(:nth-child(2n)),
  :host(.basic-board) .example-indicator:not(:nth-child(2n)) {
    border-inline-end: var(--board-border);
  }

  @media (min-width: 1024px) {
    .basic-board,
    :host(.basic-board) {
      --vaadin-board-width-small: 300px;
      --vaadin-board-width-medium: 400px;
    }

    .basic-board .example-indicator:not(:last-child),
    :host(.basic-board) .example-indicator:not(:last-child) {
      border-inline-end: var(--board-border);
    }
  }

  /****************************
 * board nested
 ****************************/
  .board-nested,
  :host(.board-nested) {
    --board-border: 1px solid var(--lumo-contrast-10pct);
    --vaadin-board-width-small: 150px;
    --vaadin-board-width-medium: 220px;
  }

  .board-nested example-statistics,
  :host(.board-nested) example-statistics {
    padding-inline-end: var(--lumo-space-m);
    border-inline-end: var(--board-border);
  }

  .board-nested .example-indicator,
  :host(.board-nested) .example-indicator {
    padding: var(--lumo-space-s);
  }

  .board-nested .example-indicator:first-child,
  :host(.board-nested) .example-indicator:first-child {
    border-block-end: var(--board-border);
  }

  @media (min-width: 1024px) {
    .board-nested .example-indicator,
    :host(.board-nested) .example-indicator {
      padding: var(--lumo-space-m);
    }

    .board-nested,
    :host(.board-nested) {
      --vaadin-board-width-small: 300px;
      --vaadin-board-width-medium: 400px;
    }
  }

  /****************************
 * board-column-wrapping
 ****************************/
  .board-column-wrapping,
  :host(.board-column-wrapping) {
    --vaadin-board-width-small: 150px;
    --vaadin-board-width-medium: 220px;
    --board-blue-10: #0090c0;
    --board-blue-20: #006c90;
    --board-blue-30: #00506b;
    --board-blue-40: #003e53;
  }

  @media (min-width: 1024px) {
    .board-column-wrapping,
    :host(.board-column-wrapping) {
      --vaadin-board-width-small: 300px;
      --vaadin-board-width-medium: 400px;
    }
  }

  .board-column-wrapping .cell,
  :host(.board-column-wrapping) .cell {
    padding: 1em 0.3em;
    text-align: center;
    color: white;
    white-space: nowrap;
  }

  @media (min-width: 1024px) {
    .board-column-wrapping .cell,
    :host(.board-column-wrapping) .cell {
      padding: 1em;
    }
  }

  .board-column-wrapping .color:nth-child(1),
  :host(.board-column-wrapping) .color:nth-child(1) {
    background: var(--board-blue-40);
  }

  .board-column-wrapping .color:nth-child(2),
  :host(.board-column-wrapping) .color:nth-child(2) {
    background: var(--board-blue-30);
  }

  .board-column-wrapping .color:nth-child(3),
  :host(.board-column-wrapping) .color:nth-child(3) {
    background: var(--board-blue-20);
  }

  .board-column-wrapping .color:nth-child(4),
  :host(.board-column-wrapping) .color:nth-child(4) {
    background: var(--board-blue-10);
  }

  /****************************
 * board-column-span
 ****************************/
  .board-column-span,
  :host(.board-column-span) {
    --vaadin-board-width-small: 150px;
    --vaadin-board-width-medium: 220px;
    --board-blue-10: #0090c0;
    --board-blue-20: #006c90;
    --board-blue-30: #00506b;
    --board-blue-40: #003e53;
    --board-inner-border: 1px dashed white;
  }

  @media (min-width: 1024px) {
    .board-column-span,
    :host(.board-column-span) {
      --vaadin-board-width-small: 300px;
      --vaadin-board-width-medium: 400px;
    }
  }

  .board-column-span,
  :host(.board-column-span) vaadin-board {
    padding: var(--lumo-space-m) 0;
  }

  .board-column-span .cell,
  :host(.board-column-span) .cell {
    padding: 1em 0.3em;
    text-align: center;
    color: white;
    white-space: nowrap;

    background: var(--board-blue-20);
  }

  @media (min-width: 1024px) {
    .board-column-span .cell,
    :host(.board-column-span) .cell {
      padding: 1em;
    }
  }

  .board-column-span .color:nth-child(1),
  :host(.board-column-span) .color:nth-child(1) {
    background: var(--board-blue-40);
  }

  .board-column-span .color:nth-child(2),
  :host(.board-column-span) .color:nth-child(2) {
    background: var(--board-blue-30);
  }

  .board-column-span .color:nth-child(3),
  :host(.board-column-span) .color:nth-child(3) {
    background: var(--board-blue-20);
  }

  .board-column-span .color:nth-child(4),
  :host(.board-column-span) .color:nth-child(4) {
    background: var(--board-blue-10);
  }

  .board-column-span .cell[board-cols='3'],
  :host(.board-column-span) .cell[board-cols='3'] {
    background: var(--board-blue-40);
  }

  .board-column-span .cell[board-cols='2'],
  :host(.board-column-span) .cell[board-cols='2'] {
    background: var(--board-blue-30);
  }

  .board-column-span .cell:not(:last-child),
  :host(.board-column-span) .cell:not(:last-child) {
    border-inline-end: var(--board-inner-border);
  }

  .board-column-span vaadin-board-row:not(:last-child) .cell,
  :host(.board-column-span) vaadin-board-row:not(:last-child) .cell {
    border-block-end: var(--board-inner-border);
  }

  /****************************
 * board-breakpoints
 ****************************/
  .board-breakpoints,
  :host(.board-breakpoints) {
    --vaadin-board-width-small: 150px;
    --vaadin-board-width-medium: 220px;
  }

  @media (min-width: 1024px) {
    .board-breakpoints,
    :host(.board-breakpoints) {
      --vaadin-board-width-small: 300px;
      --vaadin-board-width-medium: 400px;
    }
  }

  .board-breakpoints vaadin-board-row.large > .cell,
:host(.board-breakpoints)
    /* tag::breakpoint[] */
/* should be added to frontend/theme/[my-theme]/styles.css */
vaadin-board-row.large > .cell {
    background: var(--lumo-success-color-10pct);
    color: var(--lumo-success-color);
  }

  /* end::breakpoint[] */

  .board-breakpoints vaadin-board-row.medium > .cell,
:host(.board-breakpoints)
    /* tag::breakpoint[] */
vaadin-board-row.medium > .cell {
    background: var(--lumo-primary-color-10pct);
    color: var(--lumo-primary-color);
  }

  /* end::breakpoint[] */

  .board-breakpoints vaadin-board-row.small > .cell,
:host(.board-breakpoints)
    /* tag::breakpoint[] */
vaadin-board-row.small > .cell {
    background: var(--lumo-error-color-10pct);
    color: var(--lumo-error-color);
  }

  /* end::breakpoint[] */

  .board-breakpoints .cell,
  :host(.board-breakpoints) .cell {
    padding: 1em 0.3em;
    text-align: center;
    color: white;
    white-space: nowrap;
  }

  @media (min-width: 1024px) {
    .board-breakpoints .cell,
    :host(.board-breakpoints) .cell {
      padding: 1em;
    }
  }

  /* example indicator */

  .example-indicator .title {
    margin: 0;
    font-size: var(--lumo-font-size-xxs);
    font-weight: 700;
    color: var(--lumo-contrast-50pct);
  }

  .example-indicator .current {
    font-size: var(--lumo-font-size-m);
    font-weight: 700;
  }

  .example-indicator .icon {
    font-size: var(--lumo-font-size-xxs);
  }

  .example-indicator .vaadinicon {
    --vaadin-icon-width: var(--lumo-font-size-xxs);
    --vaadin-icon-height: var(--lumo-font-size-xxs);
  }

  @media (min-width: 1024px) {
    .example-indicator .title {
      font-size: var(--lumo-font-size-xxs);
    }

    .example-indicator .current {
      font-size: var(--lumo-font-size-xl);
    }

    .example-indicator .icon {
      font-size: var(--lumo-font-size-m);
    }

    .example-indicator .vaadinicon {
      --vaadin-icon-width: var(--lumo-font-size-xs);
      --vaadin-icon-height: var(--lumo-font-size-xs);
    }
  }

  /* end - example indicator */

  /* example statistics */

  .statistics {
    display: flex;
    flex-direction: column;
    font-size: var(--lumo-font-size-s);
  }

  .statistics .level {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .statistics .level::before {
    content: '';
    width: var(--lumo-font-size-xxs);
    height: var(--lumo-font-size-xxs);
    border-radius: 50%;
  }

  .statistics .excellent::before {
    background-color: var(--lumo-success-color);
  }

  .statistics .ok::before {
    background-color: var(--lumo-primary-color);
  }

  .statistics .failing::before {
    background-color: var(--lumo-error-color);
  }

  .statistics .legend {
    display: flex;
  }

  .statistics .legend label {
    display: flex;
    align-items: center;
    margin-inline-end: var(--lumo-space-m);
  }

  .statistics .legend .level {
    margin-inline-end: var(--lumo-space-s);
  }

  .statistics .title {
    font-size: var(--lumo-font-size-l);
    font-weight: 700;
  }

  .statistics .table {
    overflow: auto;
    flex-grow: 1;
  }

  .statistics .table table {
    width: 100%;
    margin-block-start: var(--lumo-space-s);
  }

  .statistics .table .number {
    text-align: end;
  }

  .statistics .table th,
  .statistics .table td {
    white-space: nowrap;
  }
  /* end: example statistics */
`;

export default boardStyles;
