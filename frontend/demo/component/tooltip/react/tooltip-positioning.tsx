import '@vaadin/icons';
import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect, useRef } from 'react';
import {
  AppLayout,
  DrawerToggle,
  Icon,
  Scroller,
  SideNav,
  type SideNavElement,
  SideNavItem,
  Tooltip,
} from '@vaadin/react-components';
import { patchSideNavNavigation } from '../../side-nav/react/side-nav-helper';

function Example() {
  const sideNavRef = useRef<SideNavElement>(null);

  useEffect(() => {
    if (sideNavRef.current) {
      // Example-specific workaround
      patchSideNavNavigation(sideNavRef.current);
    }
  }, [sideNavRef.current]);

  return (
    <AppLayout theme="narrow-drawer">
      <DrawerToggle slot="navbar">
        <Tooltip slot="tooltip" text="Expand menu" position="end" />
      </DrawerToggle>

      <SideNav
        slot="drawer"
        ref={sideNavRef}
        style={{ margin: '0 var(--vaadin-gap-xs)', '--vaadin-icon-size': '1.5rem' }}
      >
        {/* tag::snippet[] */}
        <SideNavItem path="/dashboard">
          <Icon icon="vaadin:dashboard" slot="prefix" />
          <Tooltip slot="tooltip" text="Dashboard" position="end" />
        </SideNavItem>
        {/* end::snippet[] */}
        <SideNavItem path="/orders">
          <Icon icon="vaadin:cart" slot="prefix" />
          <Tooltip slot="tooltip" text="Orders" position="end" />
        </SideNavItem>
        <SideNavItem path="/customers">
          <Icon icon="vaadin:user-heart" slot="prefix" />
          <Tooltip slot="tooltip" text="Customers" position="end" />
        </SideNavItem>
      </SideNav>
    </AppLayout>
  );
}

export default reactExample(Example); // hidden-source-line
