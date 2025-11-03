import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/board';
import './example-indicator';
import './example-chart';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/demo/theme';

@customElement('board-basic')
export class Example extends LitElement {
  connectedCallback() {
    super.connectedCallback();
    this.classList.add('basic-board');
  }

  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    applyTheme(root);
    return root;
  }

  protected override render() {
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
