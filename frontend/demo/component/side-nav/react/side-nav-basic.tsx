import '@vaadin/icons';
import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect, useRef } from 'react';
import { Icon } from '@vaadin/react-components/Icon.js';
import { SideNav, type SideNavElement } from '@vaadin/react-components/SideNav.js';
import { SideNavItem } from '@vaadin/react-components/SideNavItem.js';
import exampleStyles from './side-nav-example-styles'; // hidden-source-line
import { patchSideNavNavigation } from './side-nav-helper'; // hidden-source-line

function Example() {
  const sideNavRef = useRef<SideNavElement>(null);

  useEffect(() => {
    if (sideNavRef.current) {
      // Example-specific workaround
      patchSideNavNavigation(sideNavRef.current);
    }
  }, [sideNavRef.current]);

  return (
    <div className="side-nav-sample">
      <div>
        {/* tag::snippet[] */}
        <SideNav style={{ width: '100%' }} id="sideNav" ref={sideNavRef}>
          <SideNavItem path="/dashboard">
            <Icon icon="vaadin:dashboard" slot="prefix" />
            Dashboard
          </SideNavItem>
          <SideNavItem path="/inbox">
            <Icon icon="vaadin:envelope" slot="prefix" />
            Inbox
          </SideNavItem>
          <SideNavItem path="/calendar">
            <Icon icon="vaadin:calendar" slot="prefix" />
            Calendar
          </SideNavItem>
          <SideNavItem path="/settings">
            <Icon icon="vaadin:cog" slot="prefix" />
            Settings
          </SideNavItem>
          <SideNavItem path="https://vaadin.com">
            <Icon icon="vaadin:vaadin-h" slot="prefix" />
            Vaadin website
          </SideNavItem>
        </SideNav>
        {/* end::snippet[] */}
      </div>
    </div>
  );
}

export default reactExample(Example, exampleStyles); // hidden-source-line
