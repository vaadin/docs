import { reactExample } from 'Frontend/demo/react-example';
import React from 'react';
import { SideNav, SideNavItem } from '@hilla/react-components/SideNav.js';
import { Icon } from '@hilla/react-components/Icon.js';

function Example() {
  return (
    <div className="side-nav-sample">
      <div>
        {/* tag::snippet[] */}
        <SideNav style={{ width: '100%' }}>
          <SideNavItem path="/messages" prefix={<Icon icon="vaadin:envelope" />}>
            Messages
            <SideNavItem path="/inbox" prefix={<Icon icon="vaadin:inbox" />}>
              Inbox
            </SideNavItem>
            <SideNavItem path="/sent" prefix={<Icon icon="vaadin:paperplane" />}>
              Sent
            </SideNavItem>
            <SideNavItem path="/trash" prefix={<Icon icon="vaadin:trash" />}>
              Trash
            </SideNavItem>
          </SideNavItem>
          <SideNavItem path="/users" prefix={<Icon icon="vaadin:group" />}>
            Users
          </SideNavItem>
          <SideNavItem path="/permissions" prefix={<Icon icon="vaadin:key" />}>
            Permissions
          </SideNavItem>
        </SideNav>
        {/* end::snippet[] */}
      </div>
    </div>
  );
}

export default reactExample(Example);
