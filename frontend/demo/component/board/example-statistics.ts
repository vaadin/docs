import { getServiceHealth } from 'Frontend/demo/domain/DataService';
import ServiceHealth from 'Frontend/generated/com/vaadin/demo/domain/ServiceHealth';
import { css, customElement, html, internalProperty, LitElement } from 'lit-element';
import { repeat } from 'lit-html/directives/repeat';

@customElement('example-statistics')
export class ExampleStatistics extends LitElement {
  static get styles() {
    return css`
      :host {
        display: flex;
        flex-direction: column;
        font-size: var(--lumo-font-size-s);
      }

      .level {
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .level::before {
        content: '';
        width: var(--lumo-font-size-xxs);
        height: var(--lumo-font-size-xxs);
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
        display: flex;
        align-items: center;
        margin-inline-end: var(--lumo-space-m);
      }

      .legend .level {
        margin-inline-end: var(--lumo-space-s);
      }

      .title {
        font-size: var(--lumo-font-size-l);
        font-weight: 700;
      }

      .table {
        overflow: auto;
        flex-grow: 1;
      }

      .table table {
        width: 100%;
        margin-block-start: var(--lumo-space-s);
      }

      .table .number {
        text-align: end;
      }

      .table th,
      .table td {
        white-space: nowrap;
      }
    `;
  }

  @internalProperty()
  private serviceHealth: ServiceHealth[] = [];

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
      <div class="table">
        <table>
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
                  <td>
                    <span class="level ok"></span>
                  </td>
                  <td>${city}</td>
                  <td class="number">${input}</td>
                  <td class="number">${output}</td>
                </tr>
              `
            )}
          </tbody>
        </table>
      </div>
    `;
  }
}
