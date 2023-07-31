import { reactExample } from 'Frontend/demo/react-example';
import React from 'react';
import { AppLayout, AppLayoutNavbar, AppLayoutTabs } from '@hilla/react-components/AppLayout.js';
import { Icon } from '@hilla/react-components/Icon.js';
import { Tab } from '@hilla/react-components/Tab.js';

// tag::snippet[]
function Example() {
  return (
    <>
      <AppLayout>
        <AppLayoutNavbar>
          <h1>MyApp</h1>
        </AppLayoutNavbar>

        <AppLayoutTabs theme="minimal equal-width-tabs">
          <Tab aria-label="Dashboard">
            <Icon icon="vaadin:dashboard" />
          </Tab>
          <Tab aria-label="Orders">
            <Icon icon="vaadin:cart" />
          </Tab>
          <Tab aria-label="Customers">
            <Icon icon="vaadin:user-heart" />
          </Tab>
          <Tab aria-label="Products">
            <Icon icon="vaadin:package" />
          </Tab>
        </AppLayoutTabs>

        <div className="content">
          <h2>View title</h2>
          <p>View content</p>
        </div>
      </AppLayout>
    </>
  );
}
// end::snippet[]

export default reactExample(Example);
