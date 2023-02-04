import 'Frontend/demo/init'; // hidden-source-line

import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import '@vaadin/tabs';
import { badge } from '@vaadin/vaadin-lumo-styles/badge.js';

@customElement('tabs-badges')
export class Example extends LitElement {
  static styles = [
    badge,
    css`
      span[theme~='badge'] {
        margin-inline-start: var(--lumo-space-xs);
      }
    `,
  ];

  protected override render() {
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
