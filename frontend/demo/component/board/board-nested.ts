import 'Frontend/demo/init'; // hidden-full-source-line

import '@vaadin/vaadin-board/vaadin-board';
import { html, LitElement, customElement, css } from 'lit-element';
import { applyTheme } from 'Frontend/generated/theme';
import borderCSS from './example-border.css';
import defaultBreakpointsCSS from './example-default-breakpoints.css';
import './example-indicator';
import './example-statistics';

@customElement('board-nested')
export class Example extends LitElement {
  static get styles() {
    return [
      defaultBreakpointsCSS,
      borderCSS,
      css`
        board-statistics {
          padding: var(--lumo-space-m);
          border-inline-end: var(--board-border);
        }

        example-indicator {
          padding: var(--lumo-space-l);
        }

        example-indicator:first-child {
          border-block-end: var(--board-border);
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
