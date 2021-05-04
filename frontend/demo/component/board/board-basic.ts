import 'Frontend/demo/init'; // hidden-source-line

import '@vaadin/vaadin-board/vaadin-board';
import { html, LitElement, customElement, css } from 'lit-element';
import { applyTheme } from 'Frontend/generated/theme';
import borderCSS from './example-border.css';
import './example-indicator';
import './example-chart';

@customElement('board-basic')
export class Example extends LitElement {
  static get styles() {
    return [
      borderCSS,
      css`
        :host {
          --vaadin-board-width-small: 200px;
          --vaadin-board-width-medium: 400px;
        }

        vaadin-board-row:not(:last-child) {
          border-block-end: var(--board-border);
        }

        example-indicator {
          padding: var(--lumo-space-m);
        }

        example-indicator:not(:nth-child(2n)) {
          border-inline-end: var(--board-border);
        }

        @media (min-width: 1024px) {
          :host {
            --vaadin-board-width-small: 300px;
            --vaadin-board-width-medium: 400px;
          }

          example-indicator:not(:last-child) {
            border-inline-end: var(--board-border);
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
