import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { TabSheet, TabSheetTab } from '@vaadin/react-components/TabSheet.js';

function Example() {
  return (
    // tag::snippet[]
    <TabSheet theme="bordered">
      <TabSheetTab label="Dashboard">
        <div>This is the Dashboard tab content</div>
      </TabSheetTab>

      <TabSheetTab label="Payment">
        <div>This is the Payment tab content</div>
      </TabSheetTab>

      <TabSheetTab label="Shipping">
        <div>This is the Shipping tab content</div>
      </TabSheetTab>
    </TabSheet>
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
