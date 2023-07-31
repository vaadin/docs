import { reactExample } from 'Frontend/demo/react-example';
import React from 'react';
import { VerticalLayout } from '@hilla/react-components/VerticalLayout.js';
import { SideNav } from '@hilla/react-components/SideNav.js';
import { SideNavItem } from '@hilla/react-components/SideNavItem.js';
import { Icon } from '@hilla/react-components/Icon.js';

function Example() {
  return (
    <>
      <div className="side-nav-sample">
        {/* tag::snippet[] */}
        <VerticalLayout theme="spacing">
          <SideNav style={{ width: '100%' }}>
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
          <SideNav collapsible style={{ width: '100%' }}>
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
    </>
  );
}

export default reactExample(Example);
