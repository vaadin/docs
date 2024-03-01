import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect, useRef } from 'react';
import {
  AppLayout,
  DrawerToggle,
  Icon,
  Scroller,
  SideNav,
  SideNavItem,
  type SideNavElement,
} from '@vaadin/react-components';
import '@vaadin/icons';
import { patchSideNavNavigation } from '../../side-nav/react/side-nav-helper';

const h1Style = {
  fontSize: 'var(--lumo-font-size-l)',
  margin: 0,
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

      <Scroller slot="drawer" className="p-s">
        <SideNav ref={sideNavRef}>
          <SideNavItem path="/dashboard">
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
    </AppLayout>
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
