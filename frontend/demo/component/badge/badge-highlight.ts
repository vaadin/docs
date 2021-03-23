import { getReports, ReportStatus } from 'Frontend/demo/domain/DataService'; // hidden-full-source-line
import 'Frontend/demo/init'; // hidden-full-source-line
import Report from 'Frontend/generated/com/vaadin/demo/domain/Report'; // hidden-full-source-line

import '@vaadin/vaadin-grid';
import type { GridColumnElement, GridItemModel } from '@vaadin/vaadin-grid';
import { applyTheme } from 'Frontend/generated/theme';
import { css, customElement, html, internalProperty, LitElement } from 'lit-element';
import { render } from 'lit-html';

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
});

const renderDate = (root: HTMLElement, column?: GridColumnElement, model?: GridItemModel) => {
  if (!column || !model) {
    return;
  }

  render(html`${dateFormatter.format(new Date((model.item as Report).due))}`, root);
};

const renderStatus = (root: HTMLElement, column?: GridColumnElement, model?: GridItemModel) => {
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
        <iron-icon icon=${icon}></iron-icon>
        <span>${title}</span>
      </span>
    `,
    root
  );
};

@customElement('badge-highlight')
export class Example extends LitElement {
  static styles = css`
    .container {
      box-sizing: border-box;
      width: calc(var(--lumo-space-xl) * 15);
    }

    .container vaadin-grid {
      height: calc(var(--lumo-space-xl) * 5.125);
    }
  `;

  @internalProperty() private _items: readonly Report[] = [];

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
      <section class="container">
        <!-- tag::snippet[] -->
        <vaadin-grid .items=${this._items}>
          <vaadin-grid-column path="report" header="Report"></vaadin-grid-column>
          <vaadin-grid-column header="Due Date" .renderer=${renderDate}></vaadin-grid-column>
          <vaadin-grid-column path="assignee" header="Assignee"></vaadin-grid-column>
          <vaadin-grid-column header="Status" .renderer=${renderStatus}></vaadin-grid-column>
        </vaadin-grid>
        <!-- end::snippet[] -->
      </section>
    `;
  }
}
