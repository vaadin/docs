import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { useSignal } from '@vaadin/hilla-react-signals';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { Tabs, type TabsSelectedChangedEvent } from '@vaadin/react-components/Tabs.js';
import { VerticalLayout } from '@vaadin/react-components/VerticalLayout.js';
import { Tab } from '@vaadin/react-components/Tab.js';

function Example() {
  useSignals(); // hidden-source-line
  const value = useSignal(0);
  const pages = ['Dashboard', 'Payment', 'Shipping'];

  const selectedChanged = (e: TabsSelectedChangedEvent) => {
    value.value = e.detail.value;
  };

  return (
    <>
      {/* tag::snippet[] */}
      <Tabs selected={value.value} onSelectedChanged={selectedChanged}>
        <Tab>Dashboard</Tab>
        <Tab>Payment</Tab>
        <Tab>Shipping</Tab>
      </Tabs>

      <VerticalLayout theme="padding">
        <p>{`This is the ${pages[value.value]} tab`}</p>
      </VerticalLayout>
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example); // hidden-source-line
