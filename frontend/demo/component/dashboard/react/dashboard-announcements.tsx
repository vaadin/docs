import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useCallback } from 'react';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { useSignal } from '@vaadin/hilla-react-signals';
import {
  Dashboard,
  type DashboardItemMovedEvent,
  type DashboardItemMoveModeChangedEvent,
  type DashboardItemRemovedEvent,
  type DashboardItemResizedEvent,
  type DashboardItemResizeModeChangedEvent,
  type DashboardItemSelectedChangedEvent,
  type DashboardReactRendererProps,
  DashboardWidget,
} from '@vaadin/react-components-pro';
import type WidgetConfig from 'Frontend/generated/com/vaadin/demo/component/dashboard/WidgetConfig';
import WidgetType from 'Frontend/generated/com/vaadin/demo/component/dashboard/WidgetConfig/WidgetType';

const widgetTitles: Record<WidgetType, string> = {
  [WidgetType.VISITORS]: 'Visitors',
  [WidgetType.DOWNLOADS]: 'Downloads',
  [WidgetType.CONVERSIONS]: 'Conversions',
  [WidgetType.VISITORS_BY_COUNTRY]: 'Visitors by country',
  [WidgetType.BROWSER_DISTRIBUTION]: 'Browsers',
  [WidgetType.CAT_IMAGE]: 'A kittykat!',
  [WidgetType.VISITORS_BY_BROWSER]: 'Visitors by browser',
};

function Example() {
  useSignals(); // hidden-source-line
  const widgets = useSignal<WidgetConfig[]>([
    { type: WidgetType.VISITORS, colspan: 1, rowspan: 1 },
    { type: WidgetType.DOWNLOADS, colspan: 1, rowspan: 1 },
    { type: WidgetType.CONVERSIONS, colspan: 1, rowspan: 1 },
    { type: WidgetType.VISITORS_BY_COUNTRY, colspan: 1, rowspan: 2 },
    { type: WidgetType.BROWSER_DISTRIBUTION, colspan: 1, rowspan: 1 },
    { type: WidgetType.CAT_IMAGE, colspan: 1, rowspan: 1 },
    { type: WidgetType.VISITORS_BY_BROWSER, colspan: 2, rowspan: 1 },
  ]);
  const renderWidget = useCallback(
    ({ item }: DashboardReactRendererProps<WidgetConfig>) => (
      <DashboardWidget widgetTitle={widgetTitles[item.type]}>
        <div className="dashboard-widget-content" />
      </DashboardWidget>
    ),
    []
  );

  // tag::snippet[]
  const announcement = useSignal('');

  function handleSelectedChange(e: DashboardItemSelectedChangedEvent<WidgetConfig>) {
    // This event is fired when the user starts or stops editing a widget

    const title = widgetTitles[(e.detail.item as WidgetConfig).type];
    const selected = e.detail.value ? 'selected' : 'deselected';

    announcement.value = `Widget ${title} ${selected}`;
  }

  function handleMoveModeChange(e: DashboardItemMoveModeChangedEvent<WidgetConfig>) {
    // This event is fired when the user enters or exits move mode
    if (e.detail.value) {
      announcement.value = 'Entered move mode';
    } else {
      announcement.value = 'Exited move mode';
    }
  }

  function handleResizeModeChange(e: DashboardItemResizeModeChangedEvent<WidgetConfig>) {
    // This event is fired when the user enters or exits resize mode
    if (e.detail.value) {
      announcement.value = 'Entered resize mode';
    } else {
      announcement.value = 'Exited resize mode';
    }
  }

  function handleMove(e: DashboardItemMovedEvent<WidgetConfig>) {
    // This event is fired when the user moves a widget
    const position = e.detail.items.findIndex((widget) => widget === e.detail.item) + 1;
    const total = e.detail.items.length;

    const title = widgetTitles[(e.detail.item as WidgetConfig).type];

    announcement.value = `Moved widget ${title} to position ${position} of ${total}`;

    // Store updated widgets after user has modified them
    widgets.value = e.detail.items as WidgetConfig[];
  }

  function handleResize(e: DashboardItemResizedEvent<WidgetConfig>) {
    // This event is fired when the user resizes a widget
    const { colspan } = e.detail.item;
    const { rowspan } = e.detail.item;
    const title = widgetTitles[e.detail.item.type];

    announcement.value = `Resized widget ${title} to ${colspan} columns, ${rowspan} rows`;

    // Store updated widgets after user has modified them
    widgets.value = e.detail.items as WidgetConfig[];
  }

  function handleRemove(e: DashboardItemRemovedEvent<WidgetConfig>) {
    // This event is fired when the user removes a widget
    const title = widgetTitles[(e.detail.item as WidgetConfig).type];

    announcement.value = `Removed widget ${title}`;

    // Store updated widgets after user has modified them
    widgets.value = e.detail.items as WidgetConfig[];
  }

  return (
    <>
      <p>Live announcement:</p>
      {/* Live region for screen reader announcements. Changing its text content will result */}
      {/* in a new announcement. This element is only visible for demonstration purposes. In */}
      {/* your application you should visually hide it using CSS by applying a corresponding */}
      {/* class name, like "screen-reader-only", as shown in the attached CSS example file: */}
      {/* <div className="screen-reader-only" aria-live="polite">{announcement}</div> */}
      <div aria-live="polite">{announcement}</div>
      <Dashboard
        style={{
          '--vaadin-dashboard-col-min-width': '150px',
          '--vaadin-dashboard-col-max-count': '3',
        }}
        editable
        items={widgets.value}
        onDashboardItemSelectedChanged={handleSelectedChange}
        onDashboardItemMoveModeChanged={handleMoveModeChange}
        onDashboardItemResizeModeChanged={handleResizeModeChange}
        onDashboardItemMoved={handleMove}
        onDashboardItemResized={handleResize}
        onDashboardItemRemoved={handleRemove}
      >
        {renderWidget}
      </Dashboard>
    </>
  );
  // end::snippet[]
}

export default reactExample(Example); // hidden-source-line
