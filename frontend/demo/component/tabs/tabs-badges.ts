import 'Frontend/demo/init'; // hidden-full-source-line

import { html, LitElement, customElement, css, unsafeCSS } from 'lit-element';
import '@vaadin/vaadin-tabs/vaadin-tabs';
import '@vaadin/vaadin-lumo-styles/badge';

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
        vaadin-tab[selected] span[theme~='badge'] {
          background-color: var(--lumo-primary-color-10pct);
          color: var(--lumo-primary-text-color);
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
          <span>Open</span>
          <span theme="badge small contrast">24</span>
        </vaadin-tab>
        <vaadin-tab>
          <span>Completed</span>
          <span theme="badge small contrast">439</span>
        </vaadin-tab>
        <vaadin-tab>
          <span>Cancelled</span>
          <span theme="badge small contrast">5</span>
        </vaadin-tab>
      </vaadin-tabs>
      <!-- end::snippet[] -->
    `;
  }
}
