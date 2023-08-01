import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { Icon } from '@hilla/react-components/Icon.js';
import { Tabs } from '@hilla/react-components/Tabs.js';
import { Tab } from '@hilla/react-components/Tab.js';

function Example() {
  return (
    <>
      {/* tag::snippet[] */}
      <Tabs orientation="vertical">
        <Tab>
          <Icon icon="vaadin:user" />
          <span>Profile</span>
        </Tab>
        <Tab>
          <Icon icon="vaadin:cog" />
          <span>Settings</span>
        </Tab>
        <Tab>
          <Icon icon="vaadin:bell" />
          <span>Notifications</span>
        </Tab>
      </Tabs>
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example); // hidden-source-line
