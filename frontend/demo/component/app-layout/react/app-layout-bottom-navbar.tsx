import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { AppLayout } from '@hilla/react-components/AppLayout.js';
import { Icon } from '@hilla/react-components/Icon.js';
import { Tab } from '@hilla/react-components/Tab.js';
import { Tabs } from '@hilla/react-components/Tabs.js';

const h1Style = {
  fontSize: 'var(--lumo-font-size-l)',
  margin: 'var(--lumo-space-m) var(--lumo-space-l)',
};

const iconStyle = {
  height: 'var(--lumo-icon-size-s)',
  margin: 'auto',
  width: 'var(--lumo-icon-size-s)',
};

const tabsStyle = {
  width: '100%',
};

function Example() {
  return (
    <>
      {/* tag::snippet[] */}
      {/* --vaadin-app-layout-touch-optimized is only enforced as part of this example */}
      <AppLayout style={{ '--vaadin-app-layout-touch-optimized': true } as React.CSSProperties}>
        <h1 slot="navbar" style={h1Style}>
          MyApp
        </h1>

        <Tabs slot="navbar touch-optimized" theme="minimal equal-width-tabs" style={tabsStyle}>
          <Tab aria-label="Dashboard">
            <a tabIndex={-1}>
              <Icon icon="vaadin:dashboard" style={iconStyle} />
            </a>
          </Tab>
          <Tab aria-label="Orders">
            <a tabIndex={-1}>
              <Icon icon="vaadin:cart" style={iconStyle} />
            </a>
          </Tab>
          <Tab aria-label="Customers">
            <a tabIndex={-1}>
              <Icon icon="vaadin:user-heart" style={iconStyle} />
            </a>
          </Tab>
          <Tab aria-label="Products">
            <a tabIndex={-1}>
              <Icon icon="vaadin:package" style={iconStyle} />
            </a>
          </Tab>
        </Tabs>

        <div className="content">
          <h2>View title</h2>
          <p>View content</p>
        </div>
      </AppLayout>
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example); // hidden-source-line
