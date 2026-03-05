import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useCallback, useEffect } from 'react';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { useSignal } from '@vaadin/hilla-react-signals';
import { MenuBar, type MenuBarItem } from '@vaadin/react-components';
import {
  Dashboard,
  type DashboardReactRendererProps,
  DashboardWidget,
} from '@vaadin/react-components-pro';
import type WidgetConfig from 'Frontend/generated/com/vaadin/demo/component/dashboard/WidgetConfig';
import WidgetType from 'Frontend/generated/com/vaadin/demo/component/dashboard/WidgetConfig/WidgetType';
import { DashboardService } from 'Frontend/generated/endpoints';
import {
  BrowsersWidget,
  ConversionsWidget,
  DownloadsWidget,
  TrafficSourcesWidget,
  VisitorsByCountryWidget,
  VisitorsPerMonthWidget,
  VisitorsWidget,
} from './mock-widgets';

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
  [WidgetType.CAT_IMAGE]: 'Traffic sources',
  [WidgetType.VISITORS_BY_BROWSER]: 'Visitors per month',
};

// Helper type to allow defining a custom action for a menu item
type CustomMenuItem = MenuBarItem & {
  action?(): unknown;
};

function Example() {
  useSignals(); // hidden-source-line
  const widgets = useSignal<WidgetConfig[]>([]);
  const editable = useSignal<boolean>(false);

  function toggleEditing() {
    editable.value = !editable.value;
  }

  function save() {
    // To save the dashboard configuration, we can just take the current
    // widget items array and pass it to a server-side service for
    // persisting it.
    DashboardService.saveDashboard(widgets.value);
  }

  async function load() {
    // To load the dashboard configuration, we just load it from a server-side
    // service. If there is no configuration saved, we use a copy of the default
    // configuration.
    let config = await DashboardService.loadDashboard();
    if (!config) {
      config = [...defaultConfig];
    }
    widgets.value = config;
  }

  function addWidget(type: WidgetType) {
    // For adding a new widget, we retrieve the default configuration for the
    // widget type and add a copy of that to the widgets array.
    const defaultWidgetConfig = defaultConfig.find((widget) => widget.type === type);
    if (!defaultWidgetConfig) {
      return;
    }
    widgets.value = [...widgets.value, { ...defaultWidgetConfig }];
  }

  function restore() {
    // To restore defaults, we just set a copy of the default configuration
    widgets.value = [...defaultConfig];
  }

  // Render function should be memoized to avoid unnecessary re-renders
  const renderWidget = useCallback(({ item }: DashboardReactRendererProps<WidgetConfig>) => {
    // This function is used to render the actual widgets into the dashboard.
    // It is called by Dashboard once for each config in the widgets array
    // and should return a React element. Note that the colspan and rowspan
    // from the widget config are automatically applied by Dashboard.
    const title = widgetTitles[item.type];
    switch (item.type) {
      case WidgetType.VISITORS:
        return (
          <DashboardWidget widgetTitle={title}>
            <VisitorsWidget />
          </DashboardWidget>
        );
      case WidgetType.DOWNLOADS:
        return (
          <DashboardWidget widgetTitle={title}>
            <DownloadsWidget />
          </DashboardWidget>
        );
      case WidgetType.CONVERSIONS:
        return (
          <DashboardWidget widgetTitle={title}>
            <ConversionsWidget />
          </DashboardWidget>
        );
      case WidgetType.VISITORS_BY_COUNTRY:
        return (
          <DashboardWidget widgetTitle={title}>
            <VisitorsByCountryWidget />
          </DashboardWidget>
        );
      case WidgetType.BROWSER_DISTRIBUTION:
        return (
          <DashboardWidget widgetTitle={title}>
            <BrowsersWidget />
          </DashboardWidget>
        );
      case WidgetType.CAT_IMAGE:
        return (
          <DashboardWidget widgetTitle={title}>
            <TrafficSourcesWidget />
          </DashboardWidget>
        );
      case WidgetType.VISITORS_BY_BROWSER:
        return (
          <DashboardWidget widgetTitle={title}>
            <VisitorsPerMonthWidget />
          </DashboardWidget>
        );
      default:
        return (
          <DashboardWidget widgetTitle={title}>
            <div className="dashboard-widget-content" />
          </DashboardWidget>
        );
    }
  }, []);

  // Load the initial configuration of the dashboard
  useEffect(() => {
    load();
  }, []);

  const menuItems: CustomMenuItem[] = [
    {
      text: editable.value ? 'Apply' : 'Edit',
      action: toggleEditing,
      theme: 'primary',
    },
    {
      text: 'Save',
      action: save,
    },
    {
      text: 'Load',
      action: load,
    },
    {
      text: 'Add widget',
      children: Object.values(WidgetType).map((type) => ({
        text: widgetTitles[type as WidgetType],
        action: () => addWidget(type as WidgetType),
      })),
    },
    {
      text: 'Restore default',
      action: restore,
      theme: 'error',
    },
  ];

  return (
    <>
      <MenuBar
        theme="dropdown-indicators"
        items={menuItems}
        onItemSelected={(e) => (e.detail.value as CustomMenuItem).action?.()}
      />
      <Dashboard
        style={{
          '--vaadin-dashboard-col-min-width': '150px',
          '--vaadin-dashboard-col-max-count': '3',
        }}
        editable={editable.value}
        items={widgets.value}
        onDashboardItemMoved={(e) => {
          // Store updated widgets after user has modified them
          widgets.value = e.detail.items as WidgetConfig[];
        }}
        onDashboardItemResized={(e) => {
          widgets.value = e.detail.items as WidgetConfig[];
        }}
        onDashboardItemRemoved={(e) => {
          widgets.value = e.detail.items as WidgetConfig[];
        }}
      >
        {renderWidget}
      </Dashboard>
    </>
  );
}

// end::snippet[]

export default reactExample(Example); // hidden-source-line
