import 'Frontend/demo/init'; // hidden-full-source-line

import '@vaadin/vaadin-board';
import { html, LitElement, customElement, css } from 'lit-element';
import { applyTheme } from 'Frontend/generated/theme';
import borderCSS from './shared-styles/board-border';
import defaultBreakpointsCSS from './shared-styles/board-default-breakpoints';
import './utils/board-card';
import './utils/board-statistics';

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

        board-card {
          padding: var(--lumo-space-l);
        }

        board-card:first-child {
          border-block-end: var(--board-border);
        }
      `,
    ];
  }

  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot!);
  }

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-board>
        <vaadin-board-row>
          <board-statistics></board-statistics>
          <vaadin-board-row>
            <board-card type="+">
              Current users
              <span slot="current">745</span>
              <span slot="difference">33.7%</span>
            </board-card>
            <board-card type="+">
              Conversion rate
              <span slot="current">18%</span>
              <span slot="difference">3.9%</span>
            </board-card>
          </vaadin-board-row>
        </vaadin-board-row>
      </vaadin-board>
      <!-- end::snippet[] -->
    `;
  }
}
