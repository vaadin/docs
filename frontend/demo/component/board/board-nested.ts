import 'Frontend/demo/init'; // hidden-full-source-line

import '@vaadin/vaadin-board/vaadin-board';
import { html, LitElement, customElement, css } from 'lit-element';
import { applyTheme } from 'Frontend/generated/theme';
import borderCSS from './shared-styles/example-border.css';
import defaultBreakpointsCSS from './shared-styles/example-default-breakpoints.css';
import './utils/example-indicator';
import './utils/example-statistics';

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

        example-card {
          padding: var(--lumo-space-l);
        }

        example-card:first-child {
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
          <example-statistics></example-statistics>
          <vaadin-board-row>
            <example-card current="745" change="+33.7%" title="Current users"></example-card>
            <example-card current="18%" change="+3.9%" title="Conversion rate"></example-card>
          </vaadin-board-row>
        </vaadin-board-row>
      </vaadin-board>
      <!-- end::snippet[] -->
    `;
  }
}
