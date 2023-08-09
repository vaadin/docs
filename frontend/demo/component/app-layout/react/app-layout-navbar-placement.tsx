import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { AppLayout } from '@hilla/react-components/AppLayout.js';
import { DrawerToggle } from '@hilla/react-components/DrawerToggle.js';
import { Tabs } from '@hilla/react-components/Tabs.js';
import { Tab } from '@hilla/react-components/Tab.js';
import { Icon } from '@hilla/react-components/Icon.js';
import '@vaadin/icons';

function Example() {
  return (
    // tag::snippet[]
    <AppLayout>
      <DrawerToggle slot="navbar" />
      <h1 slot="navbar">MyApp</h1>

      <Tabs slot="drawer" orientation="vertical">
        <Tab>
          <a tabIndex={-1}>
            <Icon icon="vaadin:dashboard" />
            <span>Dashboard</span>
          </a>
        </Tab>
        <Tab>
          <a tabIndex={-1}>
            <Icon icon="vaadin:cart" />
            <span>Orders</span>
          </a>
        </Tab>
        <Tab>
          <a tabIndex={-1}>
            <Icon icon="vaadin:user-heart" />
            <span>Customers</span>
          </a>
        </Tab>
        <Tab>
          <a tabIndex={-1}>
            <Icon icon="vaadin:package" />
            <span>Products</span>
          </a>
        </Tab>
        <Tab>
          <a tabIndex={-1}>
            <Icon icon="vaadin:records" />
            <span>Documents</span>
          </a>
        </Tab>
        <Tab>
          <a tabIndex={-1}>
            <Icon icon="vaadin:list" />
            <span>Tasks</span>
          </a>
        </Tab>
        <Tab>
          <a tabIndex={-1}>
            <Icon icon="vaadin:chart" />
            <span>Analytics</span>
          </a>
        </Tab>
      </Tabs>
    </AppLayout>
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
