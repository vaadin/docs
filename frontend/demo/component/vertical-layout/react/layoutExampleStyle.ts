import { css } from 'lit';

const layoutExampleStyles = css`
  vaadin-vertical-layout,
  vaadin-horizontal-layout {
    border: 1px solid var(--lumo-primary-color);
    border-radius: var(--lumo-border-radius-l);
  }

  vaadin-vertical-layout.height-4xl,
  vaadin-horizontal-layout.height-4xl {
    height: calc(3.5rem * 4);
  }

  vaadin-vertical-layout.height-5xl,
  vaadin-horizontal-layout.height-5xl {
    height: calc(3.5rem * 5);
  }

  .container {
    border: 1px solid var(--lumo-success-color);
    border-radius: var(--lumo-border-radius-l);
  }

  .example-item {
    background: var(--lumo-primary-color);
    color: var(--lumo-primary-contrast-color);
    border-radius: var(--lumo-border-radius-m);
    padding: var(--lumo-space-s) var(--lumo-space-l);
    white-space: nowrap;
  }
`;

export default layoutExampleStyles;
