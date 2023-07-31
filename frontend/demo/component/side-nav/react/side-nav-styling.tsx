import { reactExample } from 'Frontend/demo/react-example';
import React from 'react';
import { SideNav, SideNavItem } from '@hilla/react-components/SideNav.js';
import { Icon } from '@hilla/react-components/Icon.js';

function Example() {
  return (
    <>
      {/* tag::snippet[] */}
      <div className="side-nav-sample">
        <div>
          <SideNav style={{ width: '100%' }}>
            <SideNavItem path="/dashboard">
              <Icon icon="vaadin:dashboard" slot="prefix" />
              Dashboard
            </SideNavItem>
            <SideNavItem path="/inbox">
              <Icon icon="vaadin:envelope" slot="prefix" />
              Inbox
            </SideNavItem>
            <SideNavItem
              path="https://vaadin.com"
              className="external"
              /* labelRenderer={
                <>{() => "Vaadin website"}</>
              } */
            >
              <Icon icon="vaadin:vaadin-h" slot="prefix" />
              Vaadin website
            </SideNavItem>
          </SideNav>
        </div>
      </div>
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example);
