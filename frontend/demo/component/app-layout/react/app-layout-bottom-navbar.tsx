import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect, useRef } from 'react';
import { AppLayout, type AppLayoutElement } from '@hilla/react-components/AppLayout.js';
import { Icon } from '@hilla/react-components/Icon.js';
import { Tab } from '@hilla/react-components/Tab.js';
import { Tabs } from '@hilla/react-components/Tabs.js';
import '@vaadin/icons';

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
  const appLayoutRef = useRef<AppLayoutElement>(null);
  useEffect(() => {
    const appLayout = appLayoutRef.current;
    if (appLayout) {
      // --vaadin-app-layout-touch-optimized is only enforced as part of this example
      appLayout.style.setProperty('--vaadin-app-layout-touch-optimized', 'true');
      (appLayout as any)._updateTouchOptimizedMode();
    }
  }, []);

  return (
    // tag::snippet[]
    <AppLayout ref={appLayoutRef}>
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
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
