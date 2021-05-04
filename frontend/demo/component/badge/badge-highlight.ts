import { getReports, ReportStatus } from 'Frontend/demo/domain/DataService'; // hidden-source-line
import 'Frontend/demo/init'; // hidden-source-line
import Report from 'Frontend/generated/com/vaadin/demo/domain/Report'; // hidden-source-line
import '@vaadin/vaadin-grid/vaadin-grid';
import '@vaadin/vaadin-lumo-styles/icons';
import type { GridColumnElement, GridItemModel } from '@vaadin/vaadin-grid';
import { applyTheme } from 'Frontend/generated/theme';
import { customElement, html, internalProperty, LitElement } from 'lit-element';
import { render } from 'lit-html';

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
});

@customElement('badge-highlight')
export class Example extends LitElement {
  @internalProperty()
  private items: readonly Report[] = [];

  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
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
          .renderer="${(root: HTMLElement, column?: GridColumnElement, model?: GridItemModel) => {
            if (!column || !model) {
              return;
            }

            render(html`${dateFormatter.format(new Date((model.item as Report).due))}`, root);
          }}"
        ></vaadin-grid-column>
        <vaadin-grid-column path="assignee" header="Assignee"></vaadin-grid-column>
        <vaadin-grid-column
          header="Status"
          .renderer="${(root: HTMLElement, column?: GridColumnElement, model?: GridItemModel) => {
            if (!column || !model) {
              return;
            }

            const { status } = model.item as Report;

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
                  <iron-icon icon="${icon}"></iron-icon>
                  <span>${title}</span>
                </span>
              `,
              root
            );
          }}"
        ></vaadin-grid-column>
      </vaadin-grid>
    `;
    // end::snippet[]
  }
}
