import '@vaadin/icons';
import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { Button } from '@vaadin/react-components/Button.js';
import { Icon } from '@vaadin/react-components/Icon.js';
import { TabSheet, TabSheetTab } from '@vaadin/react-components/TabSheet.js';

function Example() {
  return (
    // tag::snippet[]
    <TabSheet>
      <Button slot="prefix">Close all</Button>

      <Button slot="suffix" theme="icon" aria-label="Add tab">
        <Icon icon="vaadin:plus" />
      </Button>

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
