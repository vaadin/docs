import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react'; // hidden-source-line
import { DashboardLayout, DashboardSection, DashboardWidget } from '@vaadin/react-components-pro';
import {
  BrowsersWidget,
  ConversionsWidget,
  DownloadsWidget,
  TrafficSourcesWidget,
  VisitorsByCountryWidget,
  VisitorsPerMonthWidget,
  VisitorsWidget,
} from './mock-widgets';

function Example() {
  return (
    // tag::snippet[]
    <DashboardLayout
      style={{
        '--vaadin-dashboard-col-min-width': '150px',
        '--vaadin-dashboard-col-max-count': '3',
      }}
    >
      <DashboardSection sectionTitle="Monthly Funnel Stats">
        <DashboardWidget widgetTitle="Visitors">
          <VisitorsWidget />
        </DashboardWidget>
        <DashboardWidget widgetTitle="Downloads">
          <DownloadsWidget />
        </DashboardWidget>
        <DashboardWidget widgetTitle="Conversions">
          <ConversionsWidget />
        </DashboardWidget>
      </DashboardSection>
      {/* end::snippet[] */}

      <DashboardSection sectionTitle="Visitor Details">
        <DashboardWidget
          widgetTitle="Visitors by country"
          style={{ '--vaadin-dashboard-widget-rowspan': '2' }}
        >
          <VisitorsByCountryWidget />
        </DashboardWidget>
        <DashboardWidget widgetTitle="Browsers">
          <BrowsersWidget />
        </DashboardWidget>
        <DashboardWidget widgetTitle="Traffic sources">
          <TrafficSourcesWidget />
        </DashboardWidget>
        <DashboardWidget
          widgetTitle="Visitors per month"
          style={{ '--vaadin-dashboard-widget-colspan': '2' }}
        >
          <VisitorsPerMonthWidget />
        </DashboardWidget>
      </DashboardSection>
      {/* tag::snippet[] */}
    </DashboardLayout>
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
