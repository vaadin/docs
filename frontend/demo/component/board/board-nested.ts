import 'Frontend/demo/init'; // hidden-source-line

import '@vaadin/vaadin-board/vaadin-board';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/generated/theme';
import './example-indicator';
import './example-statistics';

@customElement('board-nested')
export class Example extends LitElement {
  constructor() {
    super();
    this.classList.add('board-nested');
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
          <example-statistics board-cols="2"></example-statistics>
          <vaadin-board-row board-cols="1">
            <example-indicator
              current="745"
              change="+33.7"
              title="Current users"
            ></example-indicator>
            <example-indicator
              current="18%"
              change="+3.9"
              title="Conversion rate"
            ></example-indicator>
          </vaadin-board-row>
        </vaadin-board-row>
      </vaadin-board>
      <!-- end::snippet[] -->
    `;
  }
}
