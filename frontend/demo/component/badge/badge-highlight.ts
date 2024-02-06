import { getReports, ReportStatus } from 'Frontend/demo/domain/DataService'; // hidden-source-line
import 'Frontend/demo/init'; // hidden-source-line
import type Report from 'Frontend/generated/com/vaadin/demo/domain/Report'; // hidden-source-line
import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '@vaadin/grid';
import { columnBodyRenderer } from '@vaadin/grid/lit.js';
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

  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  protected override async firstUpdated() {
    this.items = await getReports();
  }

  protected override render() {
    // tag::snippet[]
    return html`
      <vaadin-grid .items="${this.items}">
        <vaadin-grid-column path="report" header="Report"></vaadin-grid-column>
        <vaadin-grid-column
          header="Due date"
          ${columnBodyRenderer<Report>(
            ({ due }) => html`${dateFormatter.format(new Date(due))}`,
            []
          )}
        ></vaadin-grid-column>
        <vaadin-grid-column path="assignee" header="Assignee"></vaadin-grid-column>
        <vaadin-grid-column
          header="Status"
          ${columnBodyRenderer<Report>(({ status }) => {
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

            return html`<span theme="badge ${theme} primary">${title}</span>`;
          }, [])}
        ></vaadin-grid-column>
      </vaadin-grid>
    `;
    // end::snippet[]
  }
}
