import { getReports, ReportStatus } from 'Frontend/demo/domain/DataService'; // hidden-source-line
import 'Frontend/demo/init'; // hidden-source-line
import Report from 'Frontend/generated/com/vaadin/demo/domain/Report'; // hidden-source-line
import '@vaadin/flow-frontend/gridConnector.js'; // hidden-source-line (Grid's connector)
import '@vaadin/polymer-legacy-adapter/template-renderer.js'; // hidden-source-line (Legacy template renderer)
import { html, LitElement, render } from 'lit';
import { guard } from 'lit/directives/guard.js';
import { customElement, state } from 'lit/decorators.js';
import '@vaadin/grid';
import { GridColumn, GridItemModel } from '@vaadin/grid';
import '@vaadin/icon';
import '@vaadin/icons';
import { applyTheme } from 'Frontend/generated/theme';

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
});

@customElement('badge-highlight')
export class Example extends LitElement {
  @state()
  private items: readonly Report[] = [];

  protected createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  async firstUpdated() {
    this.items = await getReports();
  }

  render() {
    // tag::snippet[]
    return html`
      <vaadin-grid .items="${this.items}">
        <vaadin-grid-column path="report" header="Report"></vaadin-grid-column>
        <vaadin-grid-column
          header="Due date"
          .renderer="${guard(
            [],
            () => (root: HTMLElement, _column: GridColumn, model: GridItemModel<Report>) => {
              render(html`${dateFormatter.format(new Date(model.item.due))}`, root);
            }
          )}"
        ></vaadin-grid-column>
        <vaadin-grid-column path="assignee" header="Assignee"></vaadin-grid-column>
        <vaadin-grid-column
          header="Status"
          .renderer="${guard(
            [],
            () => (root: HTMLElement, _column: GridColumn, model: GridItemModel<Report>) => {
              const { status } = model.item;

              let title: string;
              let theme: string;

              switch (status) {
                case ReportStatus.COMPLETED:
                  title = 'Completed';
                  theme = 'success';
                  break;
                case ReportStatus.IN_PROGRESS:
                  title = 'In progress';
                  theme = '';
                  break;
                case ReportStatus.CANCELLED:
                  title = 'Cancelled';
                  theme = 'error';
                  break;
                default:
                  title = 'On hold';
                  theme = 'contrast';
                  break;
              }

              render(html`<span theme="badge ${theme} primary">${title}</span>`, root);
            }
          )}"
        ></vaadin-grid-column>
      </vaadin-grid>
    `;
    // end::snippet[]
  }
}
