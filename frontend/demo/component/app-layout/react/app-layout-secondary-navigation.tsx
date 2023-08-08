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
  lineHeight: 'var(--lumo-size-l)',
  margin: '0 var(--lumo-space-m)',
};

const h2Style = {
  fontSize: 'var(--lumo-font-size-l)',
  margin: 0,
};

const iconStyle = {
  marginInlineEnd: 'var(--lumo-space-m)',
  padding: 'var(--lumo-space-xs)',
};

function Example() {
  return (
    // tag::snippet[]
    <AppLayout primarySection="drawer">
      <h1 slot="drawer" style={h1Style}>
        MyApp
      </h1>

      <Tabs slot="drawer" selected={1} orientation="vertical">
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
        {/* end::snippet[] */}
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
        {/* tag::snippet[] */}
      </Tabs>

      <div slot="navbar">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <DrawerToggle />
          <h2 style={h2Style}>Orders</h2>
        </div>

        <Tabs>
          <Tab>
            <a tabIndex={-1}>All</a>
          </Tab>

          <Tab>
            <a tabIndex={-1}>Open</a>
          </Tab>
          {/* end::snippet[] */}
          <Tab>
            <a tabIndex={-1}>Completed</a>
          </Tab>
          <Tab>
            <a tabIndex={-1}>Cancelled</a>
          </Tab>
          {/* tag::snippet[] */}
        </Tabs>
      </div>
    </AppLayout>
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
