import { reactExample } from 'Frontend/demo/react-example';
import React, { useEffect } from 'react';
import { SideNav } from '@hilla/react-components/SideNav.js';
import { SideNavItem } from '@hilla/react-components/SideNavItem.js';
import { Icon } from '@hilla/react-components/Icon.js';
import { applyTheme } from 'Frontend/generated/theme';
import { patchSideNavNavigation } from 'Frontend/demo/component/side-nav/side-nav-helper'; // hidden-source-line

function Example() {
  useEffect(() => {
    patchSideNavNavigation();
  }, []);

  return (
    <div className="side-nav-sample">
      <div>
        {/* tag::snippet[] */}
        <SideNav style={{ width: '100%' }} id="sideNav">
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

export default reactExample(Example);
