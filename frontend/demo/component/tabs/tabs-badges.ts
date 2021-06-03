import 'Frontend/demo/init'; // hidden-source-line

import { css, html, LitElement, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';
import '@vaadin/vaadin-tabs/vaadin-tabs';
import '@vaadin/vaadin-lumo-styles/badge';

@customElement('tabs-badges')
export class Example extends LitElement {
  static get styles() {
    return [
      // Workaround for applying `lumo-badge` styles
      unsafeCSS(
        Array.from(document.head.querySelectorAll('style')).find(
          (style) => style.innerText.indexOf("theme~='badge'") > 0
        )?.textContent
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
