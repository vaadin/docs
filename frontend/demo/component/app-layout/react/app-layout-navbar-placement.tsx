import '@vaadin/icons';
import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import {
  AppLayout,
  DrawerToggle,
  Icon,
  Scroller,
  SideNav,
  SideNavItem,
} from '@vaadin/react-components';
import { patchSideNavNavigation } from '../../side-nav/react/side-nav-helper'; // hidden-source-line

const h1Style = {
  fontSize: '1.125rem',
  margin: 0,
};

function Example() {
  return (
    // tag::snippet[]
    <AppLayout>
      <DrawerToggle slot="navbar" />
      <h1 slot="navbar" style={h1Style}>
        MyApp
      </h1>

      <Scroller slot="drawer">
        <SideNav
          style={{ margin: 'var(--vaadin-gap-s)' }}
          ref={patchSideNavNavigation} // hidden-source-line
        >
          <SideNavItem path="/dashboard">
            <Icon icon="vaadin:dashboard" slot="prefix" />
            Dashboard
          </SideNavItem>
          <SideNavItem path="/orders">
            <Icon icon="vaadin:cart" slot="prefix" />
            Orders
          </SideNavItem>
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
        </SideNav>
      </Scroller>
    </AppLayout>
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
