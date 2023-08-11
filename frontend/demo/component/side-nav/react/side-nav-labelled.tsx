import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import { patchSideNavNavigation } from './side-nav-helper'; // hidden-source-line
import React, { useEffect, useRef } from 'react';
import { SideNav, type SideNavElement } from '@hilla/react-components/SideNav.js';
import { SideNavItem } from '@hilla/react-components/SideNavItem.js';
import { Icon } from '@hilla/react-components/Icon.js';
import { VerticalLayout } from '@hilla/react-components/VerticalLayout.js';

const Example = () => {
  const sideNavRef = useRef<SideNavElement>(null);
  const secondSideNavRef = useRef<SideNavElement>(null);

  useEffect(() => {
    if (sideNavRef.current && secondSideNavRef.current) {
      // Example-specific workaround
      patchSideNavNavigation(sideNavRef.current);
      patchSideNavNavigation(secondSideNavRef.current);
    }
  }, []);

  return (
    <div className="side-nav-sample">
      {/* tag::snippet[] */}
      <VerticalLayout theme="spacing">
        <SideNav style={{ width: '100%' }} ref={sideNavRef}>
          <span slot="label">Messages</span>
          <SideNavItem path="/inbox">
            <Icon icon="vaadin:inbox" slot="prefix"></Icon>
            Inbox
          </SideNavItem>
          <SideNavItem path="/sent">
            <Icon icon="vaadin:paperplane" slot="prefix"></Icon>
            Sent
          </SideNavItem>
          <SideNavItem path="/trash">
            <Icon icon="vaadin:trash" slot="prefix"></Icon>
            Trash
          </SideNavItem>
        </SideNav>
        <SideNav style={{ width: '100%' }} collapsible ref={secondSideNavRef}>
          <span slot="label">Admin</span>
          <SideNavItem path="/users">
            <Icon icon="vaadin:group" slot="prefix"></Icon>
            Users
          </SideNavItem>
          <SideNavItem path="/permissions">
            <Icon icon="vaadin:key" slot="prefix"></Icon>
            Permissions
          </SideNavItem>
        </SideNav>
      </VerticalLayout>
      {/* end::snippet[] */}
    </div>
  );
};

export default reactExample(Example); // hidden-source-line
