import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react'; // hidden-source-line
import { DashboardLayout, DashboardWidget } from '@vaadin/react-components-pro';

function Example() {
  return (
    // tag::snippet[]
    <DashboardLayout
      style={{
        '--vaadin-dashboard-col-min-width': '150px',
        '--vaadin-dashboard-col-max-count': '3',
      }}
    >
      <DashboardWidget widgetTitle="Visitors">
        <div className="dashboard-widget-content" />
      </DashboardWidget>
      <DashboardWidget widgetTitle="Downloads">
        <div className="dashboard-widget-content" />
      </DashboardWidget>
      <DashboardWidget widgetTitle="Conversions">
        <div className="dashboard-widget-content" />
      </DashboardWidget>
      <DashboardWidget
        widgetTitle="Visitors by country"
        style={{ '--vaadin-dashboard-widget-rowspan': '2' }}
      >
        <div className="dashboard-widget-content" />
      </DashboardWidget>
      <DashboardWidget widgetTitle="Browsers">
        <div className="dashboard-widget-content" />
      </DashboardWidget>
      <DashboardWidget widgetTitle="A kittykat!">
        <div className="dashboard-widget-content" />
      </DashboardWidget>
      <DashboardWidget
        widgetTitle="Visitors by browser"
        style={{ '--vaadin-dashboard-widget-colspan': '2' }}
      >
        <div className="dashboard-widget-content" />
      </DashboardWidget>
    </DashboardLayout>
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
