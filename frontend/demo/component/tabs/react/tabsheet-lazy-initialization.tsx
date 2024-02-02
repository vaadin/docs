import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useState } from 'react';
import {
  TabSheet,
  TabSheetTab,
  type TabSheetSelectedChangedEvent,
} from '@vaadin/react-components/TabSheet.js';

function Example() {
  // tag::snippet[]
  const [visitedTabs, setVisitedTabs] = useState(new Set<number>([0]));

  const selectedTabChanged = (event: TabSheetSelectedChangedEvent) => {
    setVisitedTabs(new Set([...visitedTabs, event.detail.value]));
  };

  return (
    <TabSheet onSelectedChanged={selectedTabChanged}>
      <TabSheetTab label="Dashboard">
        {visitedTabs.has(0) && <div>This is the Dashboard tab content</div>}
      </TabSheetTab>

      <TabSheetTab label="Payment">
        {visitedTabs.has(1) && <div>This is the Payment tab content</div>}
      </TabSheetTab>

      <TabSheetTab label="Shipping">
        {visitedTabs.has(2) && <div>This is the Shipping tab content</div>}
      </TabSheetTab>
    </TabSheet>
  );
  // end::snippet[]
}

export default reactExample(Example); // hidden-source-line
