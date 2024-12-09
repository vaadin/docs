import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/menu-bar';
import '@vaadin/dashboard/vaadin-dashboard.js';
import '@vaadin/dashboard/vaadin-dashboard-widget.js';
import { html, LitElement, render } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import type {
  Dashboard,
  DashboardItemMovedEvent,
  DashboardItemRemovedEvent,
  DashboardItemResizedEvent,
} from '@vaadin/dashboard';
import type { MenuBarItem, MenuBarItemSelectedEvent } from '@vaadin/menu-bar';
import type WidgetConfig from 'Frontend/generated/com/vaadin/demo/component/dashboard/WidgetConfig';
import WidgetType from 'Frontend/generated/com/vaadin/demo/component/dashboard/WidgetConfig/WidgetType';
import { DashboardService } from 'Frontend/generated/endpoints';
import { applyTheme } from 'Frontend/generated/theme';

// tag::snippet[]
// NOTE: This example uses the additional classes WidgetConfig and DashboardService,
// which you can find by switching to the respective file tab.

// This is the default configuration for the dashboard. Note that the order
// of the widgets in the array determines the order in which they are
// displayed in the dashboard.
const defaultConfig: WidgetConfig[] = [
  { type: WidgetType.VISITORS, colspan: 1, rowspan: 1 },
  { type: WidgetType.DOWNLOADS, colspan: 1, rowspan: 1 },
  { type: WidgetType.CONVERSIONS, colspan: 1, rowspan: 1 },
  { type: WidgetType.VISITORS_BY_COUNTRY, colspan: 1, rowspan: 2 },
  { type: WidgetType.BROWSER_DISTRIBUTION, colspan: 1, rowspan: 1 },
  { type: WidgetType.CAT_IMAGE, colspan: 1, rowspan: 1 },
  { type: WidgetType.VISITORS_BY_BROWSER, colspan: 2, rowspan: 1 },
];

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

// Helper type to allow defining a custom action for a menu item
type CustomMenuItem = MenuBarItem & {
  action?(): unknown;
};

@customElement('dashboard-editable')
export class Example extends LitElement {
  @state()
  widgets: WidgetConfig[] = [];

  @state()
  editable = false;

  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  firstUpdated() {
    // Load the initial configuration of the dashboard
    this.load();
  }

  toggleEditing() {
    this.editable = !this.editable;
  }

  async load() {
    // To load the dashboard configuration, we just load it from a server-side
    // service. If there is no configuration saved, we use a copy of the default
    // configuration.
    const config = await DashboardService.loadDashboard();
    this.widgets = config ?? [...defaultConfig];
  }

  save() {
    // To save the dashboard configuration, we can just take the current
    // widget items array and pass it to a server-side service for
    // persisting it.
    DashboardService.saveDashboard(this.widgets);
  }

  addWidget(type: WidgetType) {
    // For adding a new widget, we retrieve the default configuration for the
    // widget type and add a copy of that to the widgets array.
    const defaultWidgetConfig = defaultConfig.find((widget) => widget.type === type);
    if (defaultWidgetConfig) {
      this.widgets = [...this.widgets, { ...defaultWidgetConfig }];
    }
  }

  restore() {
    // To restore defaults, we just set a copy of the default configuration
    this.widgets = [...defaultConfig];
  }

  render() {
    return html` ${this.renderMenu()} ${this.renderDashboard()} `;
  }

  renderMenu() {
    const menuItems = [
      {
        text: this.editable ? 'Apply' : 'Edit',
        action: this.toggleEditing.bind(this),
        theme: 'primary',
      },
      {
        text: 'Save',
        action: this.save.bind(this),
      },
      {
        text: 'Load',
        action: this.load.bind(this),
      },
      {
        text: 'Add widget',
        children: Object.values(WidgetType).map((type) => ({
          text: widgetTitles[type],
          action: () => this.addWidget(type),
        })),
      },
      {
        text: 'Restore default',
        action: this.restore.bind(this),
        theme: 'error',
      },
    ];

    return html`
      <vaadin-menu-bar
        .items="${menuItems}"
        @item-selected="${(e: MenuBarItemSelectedEvent) => {
          const item = e.detail.value as CustomMenuItem;
          item.action?.();
        }}"
        theme="dropdown-indicators"
      ></vaadin-menu-bar>
    `;
  }

  renderDashboard() {
    return html`
      <vaadin-dashboard
        style="--vaadin-dashboard-col-min-width: 150px; --vaadin-dashboard-col-max-count: 3;"
        .editable="${this.editable}"
        .items="${this.widgets}"
        .renderer="${this.renderWidget}"
        @dashboard-item-moved="${(e: DashboardItemMovedEvent<WidgetConfig>) => {
          // Store updated widgets after user has modified them
          this.widgets = e.detail.items as WidgetConfig[];
        }}"
        @dashboard-item-resized="${(e: DashboardItemResizedEvent<WidgetConfig>) => {
          this.widgets = e.detail.items as WidgetConfig[];
        }}"
        @dashboard-item-removed="${(e: DashboardItemRemovedEvent<WidgetConfig>) => {
          this.widgets = e.detail.items as WidgetConfig[];
        }}"
      ></vaadin-dashboard>
    `;
  }

  renderWidget(root: HTMLElement, _dashboard: Dashboard, { item }: { item: WidgetConfig }) {
    // This method is used to render the actual widgets into the dashboard.
    // It is called by vaadin-dashboard once for each config in the widgets
    // array and should render content into the provided root element. Note
    // that the colspan and rowspan from the widget config are
    // automatically applied by vaadin-dashboard.
    // In this example all widget types have the same content, so we can
    // use generic logic to render a widget.
    render(
      html`
        <vaadin-dashboard-widget .widgetTitle="${widgetTitles[item.type]}">
          <div class="dashboard-widget-content"></div>
        </vaadin-dashboard-widget>
      `,
      root
    );

    // In practice, different widget types will have different content.
    // In that case you can use a switch statement to render the widget
    // content based on the type.
    //
    // let widget: TemplateResult;
    //
    // switch (item.type) {
    //   case WidgetType.Visitors:
    //     widget = html`
    //       <vaadin-dashboard-widget .widgetTitle="Visitors">
    //         <visitors-widget-content></visitors-widget-content>
    //       </vaadin-dashboard-widget>
    //     `;
    //     break;
    //   ...
    // }
    //
    // render(widget, root);
  }
}

// end::snippet[]
