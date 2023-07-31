import { reactExample } from 'Frontend/demo/react-example';
import React from 'react';
import { Icon } from '@hilla/react-components/Icon.js';
import { Tabs, Tab } from '@hilla/react-components/Tabs.js';

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

export default reactExample(Example);
