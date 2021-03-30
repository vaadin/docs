import 'Frontend/demo/init'; // hidden-full-source-line

import '@vaadin/vaadin-board/vaadin-board';
import { html, LitElement, customElement, css } from 'lit-element';
import { applyTheme } from 'Frontend/generated/theme';
import './utils/board-card';
import './utils/board-chart';
import './utils/board-statistics';

@customElement('board-nested')
export class Example extends LitElement {
  static get styles() {
    return css`
      .board vaadin-board-row {
        flex-wrap: nowrap;
      }
    `;
  }

  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  // tag::snippet[]
  render() {
    return html`
      <vaadin-board class="board">
        <vaadin-board-row>
          <board-chart></board-chart>
          <board-statistics></board-statistics>
          <section>
            <vaadin-board-row>
              <board-card type="+">
                Current users
                <span slot="current">745</span>
                <span slot="difference">33.7%</span>
              </board-card>
            </vaadin-board-row>
            <vaadin-board-row>
              <board-card type="+">
                Conversion rate
                <span slot="current">18%</span>
                <span slot="difference">3.9%</span>
              </board-card>
            </vaadin-board-row>
          </section>
        </vaadin-board-row>
      </vaadin-board>
    `;
  }
  // end::snippet[]
}
