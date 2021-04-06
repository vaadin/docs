import 'Frontend/demo/init'; // hidden-full-source-line

import '@vaadin/vaadin-board/vaadin-board';
import { html, LitElement, customElement, css } from 'lit-element';
import { applyTheme } from 'Frontend/generated/theme';
import borderCSS from './shared-styles/example-border.css';
import defaultBreakpointsCSS from './shared-styles/example-default-breakpoints.css';
import './utils/example-indicator';
import './utils/example-chart';

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

        example-card {
          padding: var(--lumo-space-m);
        }

        example-card:not(:last-child) {
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
          <example-card current="745" change="+33.7%" title="Current users"></example-card>
          <example-card current="54.6k" change="-112.45%" title="View events"></example-card>
          <example-card current="18%" change="+3.9%" title="Conversion rate"></example-card>
          <example-card current="-123.45" title="Custom metric"></example-card>
        </vaadin-board-row>
        <vaadin-board-row>
          <example-chart></example-chart>
        </vaadin-board-row>
      </vaadin-board>
      <!-- end::snippet[] -->
    `;
  }
}
