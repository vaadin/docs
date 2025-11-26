import '@vaadin/icons';
import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect, useRef } from 'react';
import {
  AppLayout,
  type AppLayoutElement,
  HorizontalLayout,
  type HorizontalLayoutElement,
  Icon,
} from '@vaadin/react-components';
import { patchAppLayoutNavigation } from '../app-layout-helper';

const h1Style = {
  fontSize: '1.125rem',
  margin: '1rem 1.5rem',
};

const linkStyle = {
  display: 'flex',
  alignItems: 'center',
  padding: '0 1.5rem',
};

function Example() {
  const appLayoutRef = useRef<AppLayoutElement>(null);
  const horizontalLayoutRef = useRef<HorizontalLayoutElement>(null);
  useEffect(() => {
    const appLayout = appLayoutRef.current;
    if (appLayout) {
      // --vaadin-app-layout-touch-optimized is only enforced as part of this example
      appLayout.style.setProperty('--vaadin-app-layout-touch-optimized', 'true');
      (appLayout as any)._updateTouchOptimizedMode();
    }
  }, [appLayoutRef.current]);

  useEffect(() => {
    const horizontalLayout = horizontalLayoutRef.current;
    if (horizontalLayout) {
      patchAppLayoutNavigation(horizontalLayout);
    }
  }, [horizontalLayoutRef.current]);

  return (
    // tag::snippet[]
    <AppLayout ref={appLayoutRef}>
      <h1 slot="navbar" style={h1Style}>
        MyApp
      </h1>

      <HorizontalLayout
        slot="navbar touch-optimized"
        style={{ width: '100%', justifyContent: 'space-evenly' }}
        ref={horizontalLayoutRef}
      >
        <a href="/dashboard" aria-label="Dashboard" style={linkStyle}>
          <Icon icon="vaadin:dashboard" />
        </a>
        <a href="/orders" aria-label="Orders" style={linkStyle}>
          <Icon icon="vaadin:cart" />
        </a>
        <a href="/customers" aria-label="Customers" style={linkStyle}>
          <Icon icon="vaadin:user-heart" />
        </a>
        <a href="/products" aria-label="Products" style={linkStyle}>
          <Icon icon="vaadin:package" />
        </a>
      </HorizontalLayout>

      <div className="content">
        <h2>View title</h2>
        <p>View content</p>
      </div>
    </AppLayout>
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
