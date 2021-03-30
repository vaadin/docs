import '@vaadin/vaadin-ordered-layout';
import '@vaadin/vaadin-icons/vaadin-icons';
import '@vaadin/vaadin-lumo-styles/icons';
import { getServiceHealth } from 'Frontend/demo/domain/DataService';
import ServiceHealth from 'Frontend/generated/com/vaadin/demo/domain/ServiceHealth';
import { applyTheme } from 'Frontend/generated/theme';
import { css, customElement, html, LitElement } from 'lit-element';
import { repeat } from 'lit-html/directives/repeat';

@customElement('board-statistics')
export class BoardStatistics extends LitElement {
  static get styles() {
    return css`
      .level {
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .level::before {
        content: '';
        width: var(--lumo-font-size-m);
        height: var(--lumo-font-size-m);
        border-radius: 50%;
      }

      .excellent::before {
        background-color: var(--lumo-success-color);
      }

      .ok::before {
        background-color: var(--lumo-primary-color);
      }

      .failing::before {
        background-color: var(--lumo-error-color);
      }

      .legend {
        display: flex;
      }

      .legend label {
        margin-inline-end: var(--lumo-space-m);
      }

      .legend .level {
        margin-inline-end: var(--lumo-space-s);
      }

      .title {
        font-size: var(--lumo-font-size-xl);
        font-weight: 700;
      }

      .table {
        margin-block-start: var(--lumo-space-s);
      }
    `;
  }

  private serviceHealth: readonly ServiceHealth[] = [];

  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot!);
  }

  async firstUpdated() {
    this.serviceHealth = await getServiceHealth();
  }

  render() {
    return html`
      <header class="title">Service health</header>
      <section class="legend">
        <label>
          <span class="level excellent"></span>
          Excellent
        </label>
        <label>
          <span class="level ok"></span>
          Ok
        </label>
        <label>
          <span class="level failing"></span>
          Failing
        </label>
      </section>
      <table class="table">
        <thead>
          <th></th>
          <th>City</th>
          <th>Input</th>
          <th>Output</th>
        </thead>
        <tbody>
          ${repeat(
            this.serviceHealth,
            ({ id }) => id,
            ({ city, input, output }) => html`
              <tr>
                <td class="level ok"></td>
                <td>${city}</td>
                <td>${input}</td>
                <td>${output}</td>
              </tr>
            `
          )}
        </tbody>
      </table>
    `;
  }
}
