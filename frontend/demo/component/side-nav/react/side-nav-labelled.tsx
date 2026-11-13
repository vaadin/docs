import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { Icon } from '@vaadin/react-components/Icon.js';
import { SideNav } from '@vaadin/react-components/SideNav.js';
import { SideNavItem } from '@vaadin/react-components/SideNavItem.js';
import { VerticalLayout } from '@vaadin/react-components/VerticalLayout.js';
import { patchSideNavNavigation } from './side-nav-helper'; // hidden-source-line

const Example = () => {
  return (
    <div className="side-nav-sample">
      {/* tag::snippet[] */}
      <VerticalLayout theme="spacing">
        <SideNav
          style={{ width: '100%' }}
          ref={patchSideNavNavigation} // hidden-source-line
        >
          <span slot="label">Messages</span>
          <SideNavItem path="/inbox">
            <Icon icon="vaadin:inbox" slot="prefix" />
            Inbox
          </SideNavItem>
          <SideNavItem path="/sent">
            <Icon icon="vaadin:paperplane" slot="prefix" />
            Sent
          </SideNavItem>
          <SideNavItem path="/trash">
            <Icon icon="vaadin:trash" slot="prefix" />
            Trash
          </SideNavItem>
        </SideNav>
        <SideNav
          style={{ width: '100%' }}
          collapsible
          ref={patchSideNavNavigation} // hidden-source-line
        >
          <span slot="label">Admin</span>
          <SideNavItem path="/users">
            <Icon icon="vaadin:group" slot="prefix" />
            Users
          </SideNavItem>
          <SideNavItem path="/permissions">
            <Icon icon="vaadin:key" slot="prefix" />
            Permissions
          </SideNavItem>
        </SideNav>
      </VerticalLayout>
      {/* end::snippet[] */}
    </div>
  );
};

export default reactExample(Example); // hidden-source-line
