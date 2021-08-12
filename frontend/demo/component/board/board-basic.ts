import 'Frontend/demo/init'; // hidden-source-line

import '@vaadin/vaadin-board/vaadin-board';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/generated/theme';
import './example-indicator';
import './example-chart';

@customElement('board-basic')
export class Example extends LitElement {
  constructor() {
    super();
    this.classList.add('basic-board');
  }

  protected createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
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
