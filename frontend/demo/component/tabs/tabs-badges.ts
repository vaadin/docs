import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement, customElement, css, unsafeCSS } from 'lit-element';
import '@vaadin/vaadin-tabs/vaadin-tabs';
import '@vaadin/vaadin-lumo-styles/badge.js';

@customElement('tabs-badges')
export class Example extends LitElement {
  static get styles() {
    return [
      // Workaround for applying `lumo-badge` styles
      unsafeCSS(
        document.head.querySelector('dom-module#lumo-badge')?.querySelector('template')?.content
          .firstElementChild?.textContent
      ),
      css`
        span[theme~='badge'] {
          margin-inline-start: var(--lumo-space-xs);
        }
      `,
    ];
  }

  render() {
    return html`
      <!-- tag::snippet[] -->
      <!--
        NOTE: You need import the 'lumo-badge' style sheets to use theme="badge"
      -->
      <vaadin-tabs>
        <vaadin-tab>
          Open
          <span theme="badge small">24</span>
        </vaadin-tab>
        <vaadin-tab>
          Completed
          <span theme="badge small">439</span>
        </vaadin-tab>
        <vaadin-tab>
          Cancelled
          <span theme="badge small">5</span>
        </vaadin-tab>
      </vaadin-tabs>
      <!-- end::snippet[] -->
    `;
  }
}
