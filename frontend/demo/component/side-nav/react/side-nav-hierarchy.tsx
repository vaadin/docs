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
          <SideNavItem path="/messages">
            <Icon icon="vaadin:envelope" slot="prefix" />
            Messages
            <SideNavItem path="/inbox" slot="children">
              <Icon icon="vaadin:inbox" slot="prefix" />
              Inbox
            </SideNavItem>
            <SideNavItem path="/sent" slot="children">
              <Icon icon="vaadin:paperplane" slot="prefix" />
              Sent
            </SideNavItem>
            <SideNavItem path="/trash" slot="children">
              <Icon icon="vaadin:trash" slot="prefix" />
              Trash
            </SideNavItem>
          </SideNavItem>
          <SideNavItem>
            <Icon icon="vaadin:cog" slot="prefix" />
            Admin
            <SideNavItem path="/users" slot="children">
              <Icon icon="vaadin:group" slot="prefix" />
              Users
            </SideNavItem>
            <SideNavItem path="/permissions" slot="children">
              <Icon icon="vaadin:key" slot="prefix" />
              Permissions
            </SideNavItem>
          </SideNavItem>
        </SideNav>
        {/* end::snippet[] */}
      </div>
    </div>
  );
}

export default reactExample(Example, exampleStyles); // hidden-source-line
