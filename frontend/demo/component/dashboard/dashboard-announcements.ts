import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/menu-bar';
import '@vaadin/dashboard/vaadin-dashboard.js';
import '@vaadin/dashboard/vaadin-dashboard-widget.js';
import { html, LitElement, render } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import type {
  Dashboard,
  DashboardItemMovedEvent,
  DashboardItemMoveModeChangedEvent,
  DashboardItemRemovedEvent,
  DashboardItemResizedEvent,
  DashboardItemResizeModeChangedEvent,
  DashboardItemSelectedChangedEvent,
} from '@vaadin/dashboard';
import type WidgetConfig from 'Frontend/generated/com/vaadin/demo/component/dashboard/WidgetConfig';
import WidgetType from 'Frontend/generated/com/vaadin/demo/component/dashboard/WidgetConfig/WidgetType';
import { applyTheme } from 'Frontend/demo/theme';

// Define a mapping from widget types to human-readable titles
const widgetTitles: Record<WidgetType, string> = {
  [WidgetType.VISITORS]: 'Visitors',
  [WidgetType.DOWNLOADS]: 'Downloads',
  [WidgetType.CONVERSIONS]: 'Conversions',
  [WidgetType.VISITORS_BY_COUNTRY]: 'Visitors by country',
  [WidgetType.BROWSER_DISTRIBUTION]: 'Browsers',
  [WidgetType.CAT_IMAGE]: 'A kittykat!',
  [WidgetType.VISITORS_BY_BROWSER]: 'Visitors by browser',
};

@customElement('dashboard-announcements')
export class Example extends LitElement {
  @state()
  widgets: WidgetConfig[] = [
    { type: WidgetType.VISITORS, colspan: 1, rowspan: 1 },
    { type: WidgetType.DOWNLOADS, colspan: 1, rowspan: 1 },
    { type: WidgetType.CONVERSIONS, colspan: 1, rowspan: 1 },
    { type: WidgetType.VISITORS_BY_COUNTRY, colspan: 1, rowspan: 2 },
    { type: WidgetType.BROWSER_DISTRIBUTION, colspan: 1, rowspan: 1 },
    { type: WidgetType.CAT_IMAGE, colspan: 1, rowspan: 1 },
    { type: WidgetType.VISITORS_BY_BROWSER, colspan: 2, rowspan: 1 },
  ];

  // tag::snippet[]
  @state()
  announcement: string = '';

  // end::snippet[]

  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    applyTheme(root);
    return root;
  }

  // tag::snippet[]
  handleSelectedChange(e: DashboardItemSelectedChangedEvent<WidgetConfig>) {
    // This event is fired when the user starts or stops editing a widget
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    const title = widgetTitles[(e.detail.item as WidgetConfig).type];
    const selected = e.detail.value ? 'selected' : 'deselected';

    this.announcement = `Widget ${title} ${selected}`;
  }

  handleMoveModeChange(e: DashboardItemMoveModeChangedEvent<WidgetConfig>) {
    // This event is fired when the user enters or exits move mode
    if (e.detail.value) {
      this.announcement = 'Entered move mode';
    } else {
      this.announcement = 'Exited move mode';
    }
  }

  handleResizeModeChange(e: DashboardItemResizeModeChangedEvent<WidgetConfig>) {
    // This event is fired when the user enters or exits resize mode
    if (e.detail.value) {
      this.announcement = 'Entered resize mode';
    } else {
      this.announcement = 'Exited resize mode';
    }
  }

  handleMove(e: DashboardItemMovedEvent<WidgetConfig>) {
    // This event is fired when the user moves a widget
    const position = e.detail.items.findIndex((widget) => widget === e.detail.item) + 1;
    const total = e.detail.items.length;
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    const title = widgetTitles[(e.detail.item as WidgetConfig).type];
    this.announcement = `Moved widget ${title} to position ${position} of ${total}`;

    // Store updated widgets after user has modified them
    this.widgets = e.detail.items as WidgetConfig[];
  }

  handleResize(e: DashboardItemResizedEvent<WidgetConfig>) {
    // This event is fired when the user resizes a widget
    const colspan = e.detail.item.colspan;
    const rowspan = e.detail.item.rowspan;
    const title = widgetTitles[e.detail.item.type];

    this.announcement = `Resized widget ${title} to ${colspan} columns, ${rowspan} rows`;

    // Store updated widgets after user has modified them
    this.widgets = e.detail.items as WidgetConfig[];
  }

  handleRemove(e: DashboardItemRemovedEvent<WidgetConfig>) {
    // This event is fired when the user removes a widget
    const title = widgetTitles[(e.detail.item as WidgetConfig).type];

    this.announcement = `Removed widget ${title}`;

    // Store updated widgets after user has modified them
    this.widgets = e.detail.items as WidgetConfig[];
  }

  render() {
    return html`
      <p>Live announcement:</p>
      <!--
      Live region for screen reader announcements. Changing its text content will result
      in a new announcement. This element is only visible for demonstration purposes. In
      your application you should visually hide it using CSS by applying a corresponding
      class name, like "screen-reader-only", as shown in the attached CSS example file:
      <div className="screen-reader-only" aria-live="polite">{announcement}</div>
      -->
      <div aria-live="polite">${this.announcement}</div>
      <vaadin-dashboard
        style="--vaadin-dashboard-col-min-width: 150px; --vaadin-dashboard-col-max-count: 3;"
        editable
        .items="${this.widgets}"
        .renderer="${this.renderWidget}"
        @dashboard-item-selected-changed="${this.handleSelectedChange}"
        @dashboard-item-move-mode-changed="${this.handleMoveModeChange}"
        @dashboard-item-resize-mode-changed="${this.handleResizeModeChange}"
        @dashboard-item-moved="${this.handleMove}"
        @dashboard-item-resized="${this.handleResize}"
        @dashboard-item-removed="${this.handleRemove}"
      ></vaadin-dashboard>
    `;
  }

  // end::snippet[]

  renderWidget(root: HTMLElement, _dashboard: Dashboard, { item }: { item: WidgetConfig }) {
    render(
      html`
        <vaadin-dashboard-widget .widgetTitle="${widgetTitles[item.type]}">
          <div class="dashboard-widget-content"></div>
        </vaadin-dashboard-widget>
      `,
      root
    );
  }
}
