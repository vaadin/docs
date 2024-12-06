import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect } from 'react'; // hidden-source-line
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { useSignal } from '@vaadin/hilla-react-signals';
import { MenuBar, type MenuBarItem } from '@vaadin/react-components';
import {
  Dashboard,
  type DashboardItem,
  type DashboardReactRendererProps,
  type DashboardSectionItem,
  DashboardWidget,
} from '@vaadin/react-components-pro';
import { dashboardStorage } from '../dashboard-storage';

// tag::snippet[]
// This enum defines the types of widgets that can be displayed in our dashboard
enum WidgetType {
  Visitors = 'visitors',
  Downloads = 'downloads',
  Conversions = 'conversions',
  VisitorsByCountry = 'visitorsByCountry',
  Browsers = 'browsers',
  KittyKat = 'kittyKat',
  VisitorsByBrowser = 'visitorsByBrowser',
}

// We need a type for representing widgets as data. This allows rendering
// widgets based on this data and also supports saving and loading the
// dashboard configuration. We can extend from the default DashboardItem
// type, which already includes the colspan and rowspan properties. For
// this example, we also add the type property.
export interface WidgetConfig extends DashboardItem {
  type: WidgetType;
}

// This is the default configuration for the dashboard. Note that the order
// of the widgets in the array determines the order in which they are
// displayed in the dashboard.
const defaultConfig: WidgetConfig[] = [
  { type: WidgetType.Visitors, colspan: 1, rowspan: 1 },
  { type: WidgetType.Downloads, colspan: 1, rowspan: 1 },
  { type: WidgetType.Conversions, colspan: 1, rowspan: 1 },
  { type: WidgetType.VisitorsByCountry, colspan: 1, rowspan: 2 },
  { type: WidgetType.Browsers, colspan: 1, rowspan: 1 },
  { type: WidgetType.KittyKat, colspan: 1, rowspan: 1 },
  { type: WidgetType.VisitorsByBrowser, colspan: 2, rowspan: 1 },
];

// Define a mapping from widget types to human-readable titles
const widgetTitles: Record<WidgetType, string> = {
  [WidgetType.Visitors]: 'Visitors',
  [WidgetType.Downloads]: 'Downloads',
  [WidgetType.Conversions]: 'Conversions',
  [WidgetType.VisitorsByCountry]: 'Visitors by country',
  [WidgetType.Browsers]: 'Browsers',
  [WidgetType.KittyKat]: 'A kittykat!',
  [WidgetType.VisitorsByBrowser]: 'Visitors by browser',
};

// Helper type to allow defining a custom action for a menu item
type CustomMenuItem = MenuBarItem & {
  action?(): unknown;
};

function Example() {
  useSignals(); // hidden-source-line
  // Stores the current dashboard configuration. The Dashboard component will
  // modify this array in place when editing, so there is no need to update it
  // using events.
  const widgets = useSignal<Array<DashboardSectionItem<WidgetConfig> | WidgetConfig>>([]);
  const editable = useSignal<boolean>(false);

  function toggleEditing() {
    editable.value = !editable.value;
  }

  function save() {
    // To save the dashboard configuration, we can just take the current
    // widget items array and pass it to some storage, for example through
    // an endpoint call. In this example, we just save it to local storage.
    dashboardStorage.save(widgets.value);
  }

  function load() {
    // To load the dashboard configuration, we can just read the configuration
    // from some storage, for example through an endpoint call. In this example,
    // we just load it from local storage. If there is no configuration saved,
    // we use a copy of the default configuration.
    let config = dashboardStorage.load();
    if (!config) {
      config = [...defaultConfig];
    }
    widgets.value = config;
  }

  function addWidget(type: WidgetType) {
    // For adding a new widget, we retrieve the default configuration for the widget type
    // and add a copy of that to the widgets array.
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

  useEffect(() => {
    // Load the initial configuration of the dashboard
    load();
  }, []);

  return (
    <>
      <MenuBar
        theme="dropdown-indicators"
        items={menuItems}
        onItemSelected={(e) => (e.detail.value as CustomMenuItem).action?.()}
      />
      <Dashboard
        editable={editable.value}
        items={widgets.value}
        style={{
          '--vaadin-dashboard-col-min-width': '150px',
          '--vaadin-dashboard-col-max-count': '3',
        }}
      >
        {
          ({ item }: DashboardReactRendererProps<WidgetConfig>) => (
            // This function is used to render the actual widgets into the dashboard.
            // It is called by Dashboard once for each config in the widgets array
            // and should return a React element. In this example all widget types
            // have the same content, so we can use generic logic to render a widget.
            <DashboardWidget
              widgetTitle={widgetTitles[item.type]}
              style={{
                '--vaadin-dashboard-item-colspan': item.colspan?.toString() ?? '1',
                '--vaadin-dashboard-item-rowspan': item.rowspan?.toString() ?? '1',
              }}
            >
              <div className="dashboard-widget-content" />
            </DashboardWidget>
          )

          // In practice, different widget types will have different content. In that case
          // you can use a switch statement to render the widget content based on the type.
          //
          // switch (item.type) {
          //   case WidgetType.Visitors:
          //     return (
          //       <DashboardWidget
          //         widgetTitle="Visitors"
          //         style={{
          //           '--vaadin-dashboard-item-colspan': item.colspan?.toString() ?? '1',
          //           '--vaadin-dashboard-item-rowspan': item.rowspan?.toString() ?? '1',
          //         }}
          //       >
          //         <VisitorsWidgetContent />
          //       </DashboardWidget>
          //     );
          //   ...
          // }
        }
      </Dashboard>
    </>
  );
}

// end::snippet[]

export default reactExample(Example); // hidden-source-line
