import { reactExample } from 'Frontend/demo/react-example';
import React from 'react';
import { Tabs, Tab } from '@hilla/react-components/Tabs.js';

function Example() {
  return (
    <>
      {/* tag::snippet[] */}
      <Tabs>
        <Tab>Selected</Tab>
        <Tab>Unselected</Tab>
        <Tab disabled>Disabled</Tab>
      </Tabs>
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example);
