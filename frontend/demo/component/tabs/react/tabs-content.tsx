import { reactExample } from 'Frontend/demo/react-example';
import React, { useState } from 'react';
import { Tabs, Tab } from '@hilla/react-components/Tabs.js';
import { VerticalLayout } from '@hilla/react-components/VerticalLayout.js';

function Example() {
  const [value, setValue] = useState(0);
  const pages = ['Dashboard', 'Payment', 'Shipping'];

  const selectedChanged = (e) => {
    setValue(e.detail.value);
  };

  return (
    <>
      {/* tag::snippet[] */}
      <Tabs selected={value} onSelectedChanged={selectedChanged}>
        <Tab>Dashboard</Tab>
        <Tab>Payment</Tab>
        <Tab>Shipping</Tab>
      </Tabs>

      <VerticalLayout theme="padding">
        <p>{`This is the ${pages[value]} tab`}</p>
      </VerticalLayout>
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example);
