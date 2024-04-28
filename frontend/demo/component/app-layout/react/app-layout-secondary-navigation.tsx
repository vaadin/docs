import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect, useRef } from 'react';
import { AppLayout } from '@vaadin/react-components/AppLayout.js';
import { DrawerToggle } from '@vaadin/react-components/DrawerToggle.js';
import { Icon } from '@vaadin/react-components/Icon.js';
import '@vaadin/icons';
import { Scroller } from '@vaadin/react-components/Scroller.js';
import { SideNav, type SideNavElement } from '@vaadin/react-components/SideNav.js';
import { patchSideNavNavigation } from '../../side-nav/react/side-nav-helper';
import { SideNavItem } from '@vaadin/react-components/SideNavItem.js';
import {
  HorizontalLayout,
  type HorizontalLayoutElement,
} from '@vaadin/react-components/HorizontalLayout.js';
import { patchAppLayoutNavigation } from '../app-layout-helper';

const h1Style = {
  fontSize: 'var(--lumo-font-size-l)',
  lineHeight: 'var(--lumo-size-l)',
  margin: '0 var(--lumo-space-m)',
};

const h2Style = {
  fontSize: 'var(--lumo-font-size-l)',
  margin: 0,
};

function Example() {
  const sideNavRef = useRef<SideNavElement>(null);
  const horizontalLayoutRef = useRef<HorizontalLayoutElement>(null);

  useEffect(() => {
    if (sideNavRef.current) {
      // Example-specific workaround
      patchSideNavNavigation(sideNavRef.current);
    }
  }, [sideNavRef.current]);

  useEffect(() => {
    if (horizontalLayoutRef.current) {
      // Example-specific workaround
      patchAppLayoutNavigation(horizontalLayoutRef.current);
    }
  }, [horizontalLayoutRef.current]);

  return (
    // tag::snippet[]
    <AppLayout primarySection="drawer">
      <h1 style={h1Style} slot="drawer">
        MyApp
      </h1>
      <Scroller slot="drawer" className="p-s">
        <SideNav ref={sideNavRef}>
          <SideNavItem>
            <Icon icon="vaadin:dashboard" slot="prefix" />
            Dashboard
          </SideNavItem>

          <SideNavItem path="/orders">
            <Icon icon="vaadin:cart" slot="prefix" />
            Orders
          </SideNavItem>
          {/* end::snippet[] */}
          <SideNavItem path="/customers">
            <Icon icon="vaadin:user-heart" slot="prefix" />
            Customers
          </SideNavItem>
          <SideNavItem path="/products">
            <Icon icon="vaadin:package" slot="prefix" />
            Products
          </SideNavItem>
          <SideNavItem path="/documents">
            <Icon icon="vaadin:records" slot="prefix" />
            Documents
          </SideNavItem>
          <SideNavItem path="/tasks">
            <Icon icon="vaadin:list" slot="prefix" />
            Tasks
          </SideNavItem>
          <SideNavItem path="/analytics">
            <Icon icon="vaadin:chart" slot="prefix" />
            Analytics
          </SideNavItem>
          {/* tag::snippet[] */}
        </SideNav>
      </Scroller>

      <div slot="navbar">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <DrawerToggle />
          <h2 style={h2Style}>Orders</h2>
        </div>

        <HorizontalLayout ref={horizontalLayoutRef} className="h-m justify-center gap-s">
          <a
            href="/all"
            className="flex items-center px-m text-secondary font-medium"
            style={{ textDecoration: 'none' }}
          >
            All
          </a>
          <a
            href="/open"
            className="flex items-center px-m text-secondary font-medium"
            style={{ textDecoration: 'none' }}
          >
            Open
          </a>
          {/* end::snippet[] */}
          <a
            href="/completed"
            className="flex items-center px-m text-secondary font-medium"
            style={{ textDecoration: 'none' }}
          >
            Completed
          </a>
          <a
            href="/cancelled"
            className="flex items-center px-m text-secondary font-medium"
            style={{ textDecoration: 'none' }}
          >
            Cancelled
          </a>
          {/* tag::snippet[] */}
        </HorizontalLayout>
      </div>
    </AppLayout>
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
