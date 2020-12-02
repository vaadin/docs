import '../../init'; // hidden-full-source-line

import { html, LitElement, customElement, css } from 'lit-element';
import { unsafeCSS } from '@vaadin/vaadin-themable-mixin/register-styles';
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
          margin-left: var(--lumo-space-xs);
        }
      `
    ];
  }

  render() {
    return html`
      <!-- tag::snippet[] -->
      <!--
        NOTE
        It is required to import lumo-badge style sheets to the project
        so those will be applied to the spans with "badge" theme.
        Please take a look onto lumo/lumo-overview.
      -->
      <vaadin-tabs>
        <vaadin-tab>
          Open
          <span theme="badge">24</span>
        </vaadin-tab>
        <vaadin-tab>
          Completed
          <span theme="badge">439</span>
        </vaadin-tab>
        <vaadin-tab>
          Cancelled
          <span theme="badge">5</span>
        </vaadin-tab>
      </vaadin-tabs>
      <!-- end::snippet[] -->
    `;
  }
}
