import '@vaadin/icons';
import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect, useRef } from 'react';
import { Badge } from '@vaadin/react-components/Badge.js';
import { Icon } from '@vaadin/react-components/Icon.js';
import { SideNav, type SideNavElement } from '@vaadin/react-components/SideNav.js';
import { SideNavItem } from '@vaadin/react-components/SideNavItem.js';
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
        <SideNav style={{ width: '100%' }} ref={sideNavRef}>
          <SideNavItem path="/inbox">
            <Icon icon="vaadin:envelope" slot="prefix" />
            Inbox
            <Badge number={12} theme="filled number-only" slot="suffix">
              unread messages
            </Badge>
          </SideNavItem>
          <SideNavItem path="/calendar">
            <Icon icon="vaadin:calendar" slot="prefix" />
            Calendar
            <Badge theme="error icon-only" slot="suffix">
              <Icon icon="vaadin:bell" slot="icon" />
              Upcoming appointment
            </Badge>
          </SideNavItem>
        </SideNav>
        {/* end::snippet[] */}
      </div>
    </div>
  );
}

export default reactExample(Example); // hidden-source-line
