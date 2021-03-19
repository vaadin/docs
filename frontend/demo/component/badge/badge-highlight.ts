import { getReports, Report, ReportStatus } from 'Frontend/demo/domain/DataService'; // hidden-full-source-line
import 'Frontend/demo/init'; // hidden-full-source-line

import type { GridItemModel } from '@vaadin/vaadin-grid';
import type { GridColumnElement } from '@vaadin/vaadin-grid/vaadin-grid';
import '@vaadin/vaadin-checkbox/vaadin-checkbox';
import { applyTheme } from 'Frontend/generated/theme';
import { css, customElement, html, LitElement } from 'lit-element';
import { render } from 'lit-html';

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
});

@customElement('badge-highlight')
export class Example extends LitElement {
  static styles = css`
    .reports {
      box-sizing: border-box;
      width: calc(var(--lumo-space-xl) * 15);
    }

    .reports vaadin-grid {
      height: calc(var(--lumo-space-xl) * 5.125);
    }
  `;

  private static _renderDate(
    root: HTMLElement,
    column?: GridColumnElement,
    model?: GridItemModel
  ): void {
    if (!column || !model) {
      return;
    }

    render(html`${dateFormatter.format((model.item as Report).due)}`, root);
  }

  private static _renderStatus(
    root: HTMLElement,
    column?: GridColumnElement,
    model?: GridItemModel
  ): void {
    if (!column || !model) {
      return;
    }

    const { status } = model.item as Report;

    let icon: string;
    let title: string;
    let theme: string;

    switch (status) {
      case ReportStatus.Completed:
        icon = 'lumo:checkmark';
        title = 'Completed';
        theme = 'success';
        break;
      case ReportStatus.InProgress:
        icon = 'lumo:cog';
        title = 'In Progress';
        theme = '';
        break;
      case ReportStatus.Cancelled:
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
          <iron-icon icon=${icon}></iron-icon>
          <span>${title}</span>
        </span>
      `,
      root
    );
  }

  public ['constructor']: typeof Example;

  private _items: readonly Report[] = [];

  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  async firstUpdated() {
    this._items = await getReports();
  }

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-grid .items=${this._items}>
        <vaadin-grid-column path="report" header="Report"></vaadin-grid-column>
        <vaadin-grid-column
          header="Due Date"
          .renderer=${this.constructor._renderDate}
        ></vaadin-grid-column>
        <vaadin-grid-column path="assignee" header="Assignee"></vaadin-grid-column>
        <vaadin-grid-column
          header="Status"
          .renderer=${this.constructor._renderStatus}
        ></vaadin-grid-column>
      </vaadin-grid>
      <!-- end::snippet[] -->
    `;
  }
}
