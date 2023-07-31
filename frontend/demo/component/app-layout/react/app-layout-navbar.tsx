import { reactExample } from 'Frontend/demo/react-example';
import React from 'react';
import { AppLayout } from '@hilla/react-components/AppLayout.js';
import { Tabs } from '@hilla/react-components/Tabs.js';
import { Tab } from '@hilla/react-components/Tab.js';

function Example() {
  return (
    <>
      {/* tag::snippet[] */}
      <AppLayout>
        <h1 slot="navbar">MyApp</h1>
        <Tabs slot="navbar">
          <Tab>
            <a tabIndex={-1}>Dashboard</a>
          </Tab>
          <Tab>
            <a tabIndex={-1}>Orders</a>
          </Tab>
          <Tab>
            <a tabIndex={-1}>Customers</a>
          </Tab>
          <Tab>
            <a tabIndex={-1}>Products</a>
          </Tab>
        </Tabs>
      </AppLayout>
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example);
