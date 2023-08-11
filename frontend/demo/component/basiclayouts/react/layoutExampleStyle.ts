import { css } from 'lit';

const layoutExampleStyles = css`
  vaadin-vertical-layout,
  vaadin-horizontal-layout {
    border: 1px solid var(--lumo-primary-color);
    border-radius: var(--lumo-border-radius-l);
  }

  vaadin-vertical-layout.height-4xl,
  vaadin-horizontal-layout.height-4xl {
    height: calc(var(--lumo-size-xl) * 4);
  }

  vaadin-vertical-layout.height-5xl,
  vaadin-horizontal-layout.height-5xl {
    height: calc(var(--lumo-size-xl) * 5);
  }

  .container {
    border: 1px solid var(--lumo-success-color);
    border-radius: var(--lumo-border-radius-l);
  }
`;

export default layoutExampleStyles;
