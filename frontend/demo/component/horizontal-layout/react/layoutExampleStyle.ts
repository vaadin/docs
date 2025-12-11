import { css } from 'lit';

const layoutExampleStyles = css`
  vaadin-vertical-layout,
  vaadin-horizontal-layout {
    border: 1px solid var(--vaadin-border-color);
    border-radius: 0.5em;
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
    border: 1px solid var(--vaadin-border-color);
    border-radius: 0.5em;
  }

  .example-item {
    background: var(--vaadin-background-container-strong);
    color: var(--vaadin-text-color);
    border-radius: 0.5em;
    padding: var(--vaadin-padding-s) var(--vaadin-padding-l);
    white-space: nowrap;
  }
`;

export default layoutExampleStyles;
