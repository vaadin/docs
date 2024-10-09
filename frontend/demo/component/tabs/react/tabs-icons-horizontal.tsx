import '@vaadin/icons';
import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { Icon } from '@vaadin/react-components/Icon.js';
import { Tab } from '@vaadin/react-components/Tab.js';
import { Tabs } from '@vaadin/react-components/Tabs.js';

function Example() {
  return (
    // tag::snippet[]
    <Tabs>
      <Tab theme="icon-on-top">
        <Icon icon="vaadin:user" />
        <span>Profile</span>
      </Tab>

      <Tab theme="icon-on-top">
        <Icon icon="vaadin:cog" />
        <span>Settings</span>
      </Tab>

      <Tab theme="icon-on-top">
        <Icon icon="vaadin:bell" />
        <span>Notifications</span>
      </Tab>
    </Tabs>
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
