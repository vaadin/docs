import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react'; // hidden-source-line
import { DashboardWidget } from '@vaadin/react-components-pro';

function Example() {
  return (
    // tag::snippet[]
    <DashboardWidget widgetTitle="Widget title">
      <span>Widget content</span>
      <span slot="header-content">Additional header content</span>
    </DashboardWidget>
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
