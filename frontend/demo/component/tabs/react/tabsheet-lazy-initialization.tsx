import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import {
  TabSheet,
  TabSheetTab,
  type TabSheetSelectedChangedEvent,
} from '@vaadin/react-components/TabSheet.js';
import { useSignal } from '@vaadin/hilla-react-signals';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line

function Example() {
  useSignals(); // hidden-source-line
  // tag::snippet[]
  const visitedTabs = useSignal(new Set<number>([0]));

  const selectedTabChanged = (event: TabSheetSelectedChangedEvent) => {
    visitedTabs.value = new Set([...visitedTabs.value, event.detail.value]);
  };

  return (
    <TabSheet onSelectedChanged={selectedTabChanged}>
      <TabSheetTab label="Dashboard">
        {visitedTabs.value.has(0) && <div>This is the Dashboard tab content</div>}
      </TabSheetTab>

      <TabSheetTab label="Payment">
        {visitedTabs.value.has(1) && <div>This is the Payment tab content</div>}
      </TabSheetTab>

      <TabSheetTab label="Shipping">
        {visitedTabs.value.has(2) && <div>This is the Shipping tab content</div>}
      </TabSheetTab>
    </TabSheet>
  );
  // end::snippet[]
}

export default reactExample(Example); // hidden-source-line
