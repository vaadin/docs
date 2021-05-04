import 'Frontend/demo/init'; // hidden-source-line

import '@vaadin/vaadin-board/vaadin-board';
import { html, LitElement, customElement, css } from 'lit-element';
import { applyTheme } from 'Frontend/generated/theme';
import borderCSS from './example-border.css';
import defaultBreakpointsCSS from './example-breakpoint-default.css';
import './example-indicator';
import './example-statistics';

@customElement('board-nested')
export class Example extends LitElement {
  static get styles() {
    return [
      defaultBreakpointsCSS,
      borderCSS,
      css`
        example-statistics {
          padding-inline-end: var(--lumo-space-m);
          border-inline-end: var(--board-border);
        }

        example-indicator {
          padding: var(--lumo-space-s);
        }

        example-indicator:first-child {
          border-block-end: var(--board-border);
        }

        @media (min-width: 1024px) {
          example-indicator {
            padding: var(--lumo-space-m);
          }
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
          <example-statistics board-cols="2"></example-statistics>
          <vaadin-board-row board-cols="1">
            <example-indicator
              current="745"
              change="+33.7"
              title="Current users"
            ></example-indicator>
            <example-indicator
              current="18%"
              change="+3.9"
              title="Conversion rate"
            ></example-indicator>
          </vaadin-board-row>
        </vaadin-board-row>
      </vaadin-board>
      <!-- end::snippet[] -->
    `;
  }
}
