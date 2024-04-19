import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import { patchSideNavNavigation } from './side-nav-helper'; // hidden-source-line
import React, { useEffect, useRef } from 'react';
import { SideNav, type SideNavElement } from '@vaadin/react-components/SideNav.js';
import { SideNavItem } from '@vaadin/react-components/SideNavItem.js';
import { Icon } from '@vaadin/react-components/Icon.js';
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
          <SideNavItem path="/inbox">
            <Icon icon="vaadin:envelope" slot="prefix" />
            Inbox
            <span
              {...{ theme: 'badge contrast pill' }}
              slot="suffix"
              aria-label="12 unread messages"
            >
              12
            </span>
          </SideNavItem>
          <SideNavItem path="/calendar">
            <Icon icon="vaadin:calendar" slot="prefix" />
            Calendar
            <Icon
              icon="vaadin:bell"
              theme="badge error pill"
              style={{ padding: 'var(--lumo-space-xs)' }}
              aria-label="Upcoming appointment"
              slot="suffix"
            />
          </SideNavItem>
        </SideNav>
        {/* end::snippet[] */}
      </div>
    </div>
  );
}

export default reactExample(Example); // hidden-source-line
