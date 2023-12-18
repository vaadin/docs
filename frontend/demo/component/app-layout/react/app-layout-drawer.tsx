import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect, useRef } from 'react';
import { AppLayout } from '@hilla/react-components/AppLayout.js';
import { DrawerToggle } from '@hilla/react-components/DrawerToggle.js';
import { Icon } from '@hilla/react-components/Icon.js';
import { SideNav, type SideNavElement } from '@hilla/react-components/SideNav.js';
import { SideNavItem } from '@hilla/react-components/SideNavItem.js';
import '@vaadin/icons';
import { patchSideNavNavigation } from '../../side-nav/react/side-nav-helper';

const h1Style = {
  fontSize: 'var(--lumo-font-size-l)',
};

const iconStyle: React.CSSProperties = {
  marginInlineEnd: 'var(--lumo-space-m)',
  padding: 'var(--lumo-space-xs)',
  boxSizing: 'border-box',
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
      <DrawerToggle slot="navbar" />

      <h1 slot="navbar" style={h1Style}>
        Dashboard
      </h1>

      <SideNav slot="drawer" ref={sideNavRef}>
        <SideNavItem path="/dashboard">
          <Icon icon="vaadin:dashboard" style={iconStyle} />
          <span>Dashboard</span>
        </SideNavItem>
        <SideNavItem path="/orders">
          <Icon icon="vaadin:cart" style={iconStyle} />
          <span>Orders</span>
        </SideNavItem>
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
      </SideNav>
    </AppLayout>
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
