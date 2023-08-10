import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { AppLayout } from '@hilla/react-components/AppLayout.js';
import { Tabs } from '@hilla/react-components/Tabs.js';
import { Tab } from '@hilla/react-components/Tab.js';

const h1Style: React.CSSProperties = {
  fontSize: 'var(--lumo-font-size-l)',
  left: 'var(--lumo-space-l)',
  margin: 0,
  position: 'absolute',
};

const tabsStyle = {
  margin: 'auto',
};

function Example() {
  return (
    // tag::snippet[]
    <AppLayout>
      <h1 slot="navbar" style={h1Style}>
        MyApp
      </h1>
      <Tabs slot="navbar" style={tabsStyle}>
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
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
