import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect, useRef } from 'react';
import { AppLayout } from '@hilla/react-components/AppLayout.js';
import { DrawerToggle } from '@hilla/react-components/DrawerToggle.js';
import { Tabs } from '@hilla/react-components/Tabs.js';
import { Tab } from '@hilla/react-components/Tab.js';
import { Icon } from '@hilla/react-components/Icon.js';
import '@vaadin/icons';
import { SideNav, type SideNavElement } from '@hilla/react-components/SideNav.js';
import { patchSideNavNavigation } from '../../side-nav/react/side-nav-helper';
import { SideNavItem } from '@hilla/react-components/SideNavItem.js';

const h1Style = {
  fontSize: 'var(--lumo-font-size-l)',
  lineHeight: 'var(--lumo-size-l)',
  margin: '0 var(--lumo-space-m)',
};

const h2Style = {
  fontSize: 'var(--lumo-font-size-l)',
  margin: 0,
};

const iconStyle: React.CSSProperties = {
  boxSizing: 'border-box',
  marginInlineEnd: 'var(--lumo-space-m)',
  padding: 'var(--lumo-space-xs)',
};

function Example() {
  const sideNavRef = useRef<SideNavElement>(null);

  useEffect(() => {
    if (sideNavRef.current) {
      // Example-specific workaround
      patchSideNavNavigation(sideNavRef.current);
    }
  }, []);
  return (
    // tag::snippet[]
    <AppLayout primarySection="drawer">
      <h1 slot="drawer" style={h1Style}>
        MyApp
      </h1>

      <SideNav slot="drawer" ref={sideNavRef}>
        <SideNavItem>
          <a tabIndex={-1}>
            <Icon icon="vaadin:dashboard" style={iconStyle} />
            <span>Dashboard</span>
          </a>
        </SideNavItem>

        <SideNavItem path="/orders">
          <Icon icon="vaadin:cart" style={iconStyle} />
          <span>Orders</span>
        </SideNavItem>
        {/* end::snippet[] */}
        <SideNavItem path="/customers">
          <Icon icon="vaadin:user-heart" style={iconStyle} />
          <span>Customers</span>
        </SideNavItem>
        <SideNavItem path="/products">
          <Icon icon="vaadin:package" style={iconStyle} />
          <span>Products</span>
        </SideNavItem>
        <SideNavItem path="/documents">
          <Icon icon="vaadin:records" style={iconStyle} />
          <span>Documents</span>
        </SideNavItem>
        <SideNavItem path="/tasks">
          <Icon icon="vaadin:list" style={iconStyle} />
          <span>Tasks</span>
        </SideNavItem>
        <SideNavItem path="/analytics">
          <Icon icon="vaadin:chart" style={iconStyle} />
          <span>Analytics</span>
        </SideNavItem>
        {/* tag::snippet[] */}
      </SideNav>

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
