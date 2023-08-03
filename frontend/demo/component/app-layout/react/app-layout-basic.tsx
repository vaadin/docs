import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { AppLayout } from '@hilla/react-components/AppLayout.js';
import { DrawerToggle } from '@hilla/react-components/DrawerToggle.js';
import { Tabs } from '@hilla/react-components/Tabs.js';
import { Tab } from '@hilla/react-components/Tab.js';
import { Icon } from '@hilla/react-components/Icon.js';
import '@vaadin/icons';

const h1Style = {
  fontSize: 'var(--lumo-font-size-l)',
  margin: 0,
};

const iconStyle = {
  marginInlineEnd: 'var(--lumo-space-m)',
  marginInlineStart: 'var(--lumo-space-xs)',
  padding: 'var(--lumo-space-xs)',
};

function Example() {
  return (
    // tag::snippet[]
    <AppLayout>
      <DrawerToggle slot="navbar"></DrawerToggle>
      <h1 slot="navbar" style={h1Style}>
        MyApp
      </h1>
      <Tabs slot="drawer" orientation="vertical">
        <Tab>
          <a tabIndex={-1}>
            <Icon icon="vaadin:dashboard" style={iconStyle} />
            <span>Dashboard</span>
          </a>
        </Tab>
        <Tab>
          <a tabIndex={-1}>
            <Icon icon="vaadin:cart" style={iconStyle} />
            <span>Orders</span>
          </a>
        </Tab>
        <Tab>
          <a tabIndex={-1}>
            <Icon icon="vaadin:user-heart" style={iconStyle} />
            <span>Customers</span>
          </a>
        </Tab>
        <Tab>
          <a tabIndex={-1}>
            <Icon icon="vaadin:package" style={iconStyle} />
            <span>Products</span>
          </a>
        </Tab>
        <Tab>
          <a tabIndex={-1}>
            <Icon icon="vaadin:records" style={iconStyle} />
            <span>Documents</span>
          </a>
        </Tab>
        <Tab>
          <a tabIndex={-1}>
            <Icon icon="vaadin:list" style={iconStyle} />
            <span>Tasks</span>
          </a>
        </Tab>
        <Tab>
          <a tabIndex={-1}>
            <Icon icon="vaadin:chart" style={iconStyle} />
            <span>Analytics</span>
          </a>
        </Tab>
      </Tabs>
    </AppLayout>
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
