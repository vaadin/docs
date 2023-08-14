import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { AppLayout } from '@hilla/react-components/AppLayout.js';
import { DrawerToggle } from '@hilla/react-components/DrawerToggle.js';
import { Tooltip } from '@hilla/react-components/Tooltip.js';
import { Tabs } from '@hilla/react-components/Tabs.js';
import { Tab } from '@hilla/react-components/Tab.js';
import { Icon } from '@hilla/react-components/Icon.js';
import '@vaadin/icons';

function Example() {
  return (
    <AppLayout theme="narrow-drawer">
      <DrawerToggle slot="navbar">
        <Tooltip slot="tooltip" text="Expand menu" position="end" />
      </DrawerToggle>

      {/* tag::snippet[] */}
      <Tabs slot="drawer" orientation="vertical">
        <Tab>
          <a tabIndex={-1}>
            <Icon icon="vaadin:home" />
          </a>
          <Tooltip slot="tooltip" text="Home" position="end" />
        </Tab>

        <Tab>
          <a tabIndex={-1}>
            <Icon icon="vaadin:calendar" />
          </a>
          <Tooltip slot="tooltip" text="Calendar" position="end" />
        </Tab>

        <Tab>
          <a tabIndex={-1}>
            <Icon icon="vaadin:chart" />
          </a>
          <Tooltip slot="tooltip" text="Reports" position="end" />
        </Tab>
      </Tabs>
      {/* end::snippet[] */}
    </AppLayout>
  );
}

export default reactExample(Example); // hidden-source-line
