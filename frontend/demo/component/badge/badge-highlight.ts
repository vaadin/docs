import { getReports, ReportStatus } from 'Frontend/demo/domain/DataService'; // hidden-source-line
import 'Frontend/demo/init'; // hidden-source-line
import Report from 'Frontend/generated/com/vaadin/demo/domain/Report'; // hidden-source-line
import '@vaadin/vaadin-grid/vaadin-grid';
import '@vaadin/vaadin-lumo-styles/icons';
import type { GridColumnElement, GridItemModel } from '@vaadin/vaadin-grid';
import { applyTheme } from 'Frontend/generated/theme';
import { html, LitElement, render } from 'lit';
import { guard } from 'lit/directives/guard';
import { customElement, state } from 'lit/decorators.js';

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
          header="Due Date"
          .renderer="${guard(
            [],
            () => (root: HTMLElement, column?: GridColumnElement, model?: GridItemModel<Report>) => {
              if (!column || !model) {
                return;
              }

              render(html`${dateFormatter.format(new Date(model.item.due))}`, root);
            }
          )}"
        ></vaadin-grid-column>
        <vaadin-grid-column path="assignee" header="Assignee"></vaadin-grid-column>
        <vaadin-grid-column
          header="Status"
          .renderer="${guard(
            [],
            () => (root: HTMLElement, column?: GridColumnElement, model?: GridItemModel<Report>) => {
              if (!column || !model) {
                return;
              }

              const { status } = model.item;

              let icon: string;
              let title: string;
              let theme: string;

              switch (status) {
                case ReportStatus.COMPLETED:
                  icon = 'lumo:checkmark';
                  title = 'Completed';
                  theme = 'success';
                  break;
                case ReportStatus.IN_PROGRESS:
                  icon = 'lumo:cog';
                  title = 'In Progress';
                  theme = '';
                  break;
                case ReportStatus.CANCELLED:
                  icon = 'lumo:cross';
                  title = 'Cancelled';
                  theme = 'error';
                  break;
                default:
                  icon = 'lumo:clock';
                  title = 'On Hold';
                  theme = 'contrast';
                  break;
              }

              render(
                html`
                  <span theme="badge ${theme} primary">
                    <vaadin-icon icon="${icon}"></vaadin-icon>
                    <span>${title}</span>
                  </span>
                `,
                root
              );
            }
          )}"
        ></vaadin-grid-column>
      </vaadin-grid>
    `;
    // end::snippet[]
  }
}
