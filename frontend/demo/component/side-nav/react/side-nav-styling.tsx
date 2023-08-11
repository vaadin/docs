import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import { patchSideNavNavigation } from './side-nav-helper'; // hidden-source-line
import React, { useEffect, useRef } from 'react';
import { SideNav, type SideNavElement } from '@hilla/react-components/SideNav.js';
import { SideNavItem } from '@hilla/react-components/SideNavItem.js';
import { Icon } from '@hilla/react-components/Icon.js';
import '@vaadin/icons';

function Example() {
  const sideNavRef = useRef<SideNavElement>(null);

  useEffect(() => {
    if (sideNavRef.current) {
      // Example-specific workaround
      patchSideNavNavigation(sideNavRef.current);
    }
  }, []);

  return (
    <div className="side-nav-sample">
      <div>
        {/* tag::snippet[] */}
        <SideNav style={{ width: '100%' }} ref={sideNavRef}>
          <SideNavItem path="/dashboard">
            <Icon icon="vaadin:dashboard" slot="prefix" />
            Dashboard
          </SideNavItem>
          <SideNavItem path="/inbox">
            <Icon icon="vaadin:envelope" slot="prefix" />
            Inbox
          </SideNavItem>
          <SideNavItem path="https://vaadin.com" className="external">
            <Icon icon="vaadin:vaadin-h" slot="prefix" />
            Vaadin website
          </SideNavItem>
        </SideNav>
        {/* end::snippet[] */}
      </div>
    </div>
  );
}

export default reactExample(Example); // hidden-source-line
