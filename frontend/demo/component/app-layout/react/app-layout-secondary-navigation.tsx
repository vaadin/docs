import '@vaadin/icons';
import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect, useRef } from 'react';
import {
  AppLayout,
  DrawerToggle,
  HorizontalLayout,
  type HorizontalLayoutElement,
  Icon,
  Scroller,
  SideNav,
  type SideNavElement,
  SideNavItem,
} from '@vaadin/react-components';
import { patchSideNavNavigation } from '../../side-nav/react/side-nav-helper';
import { patchAppLayoutNavigation } from '../app-layout-helper';

const h1Style = {
  fontSize: '1.125rem',
  lineHeight: '2.75rem',
  margin: '0 var(--lumo-space-m)',
};

const h2Style = {
  fontSize: '1.125rem',
  margin: 0,
};

const linkStyle = {
  display: 'flex',
  alignItems: 'center',
  padding: '0 1rem',
  fontWeight: '500',
  textDecoration: 'none',
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
      <Scroller slot="drawer" style={{ padding: '0.5rem' }}>
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

        <HorizontalLayout
          ref={horizontalLayoutRef}
          style={{ height: '2.25rem', justifyContent: 'center', gap: '0.5rem' }}
        >
          <a href="/all" style={linkStyle}>
            All
          </a>
          <a href="/open" style={linkStyle}>
            Open
          </a>
          {/* end::snippet[] */}
          <a href="/completed" style={linkStyle}>
            Completed
          </a>
          <a href="/cancelled" style={linkStyle}>
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
