import 'Frontend/demo/init'; // hidden-full-source-line

import '@vaadin/vaadin-board/vaadin-board';
import { html, LitElement, customElement, css } from 'lit-element';
import { applyTheme } from 'Frontend/generated/theme';
import borderCSS from './example-border.css';
import defaultBreakpointsCSS from './example-default-breakpoints.css';
import './example-indicator';
import './example-chart';

@customElement('board-basic')
export class Example extends LitElement {
  static get styles() {
    return [
      defaultBreakpointsCSS,
      borderCSS,
      css`
        vaadin-board-row:not(:last-child) {
          border-block-end: var(--board-border);
        }

        example-indicator {
          padding: var(--lumo-space-m);
        }

        example-indicator:not(:last-child) {
          border-inline-end: var(--board-border);
        }
      `,
    ];
  }

  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-board>
        <vaadin-board-row>
          <example-indicator current="745" change="+33.7" title="Current users"></example-indicator>
          <example-indicator
            current="54.6k"
            change="-112.45"
            title="View events"
          ></example-indicator>
          <example-indicator
            current="18%"
            change="+3.9"
            title="Conversion rate"
          ></example-indicator>
          <example-indicator current="-123.45" title="Custom metric"></example-indicator>
        </vaadin-board-row>
        <vaadin-board-row>
          <example-chart></example-chart>
        </vaadin-board-row>
      </vaadin-board>
      <!-- end::snippet[] -->
    `;
  }
}
