import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect, useRef } from 'react';
import {
  AppLayout,
  type AppLayoutElement,
  HorizontalLayout,
  type HorizontalLayoutElement,
  Icon,
} from '@vaadin/react-components';
import '@vaadin/icons';
import { patchAppLayoutNavigation } from '../app-layout-helper';

const h1Style = {
  fontSize: 'var(--lumo-font-size-l)',
  margin: 'var(--lumo-space-m) var(--lumo-space-l)',
};

const iconStyle = {
  height: 'var(--lumo-icon-size-s)',
  margin: 'auto',
  width: 'var(--lumo-icon-size-s)',
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
    const horizontalLayout = horizontalLayoutRef.current;
    if (horizontalLayout) {
      patchAppLayoutNavigation(horizontalLayout);
    }
  }, []);

  return (
    // tag::snippet[]
    <AppLayout ref={appLayoutRef}>
      <h1 slot="navbar" style={h1Style}>
        MyApp
      </h1>

      <HorizontalLayout
        slot="navbar touch-optimized"
        className="w-full justify-evenly self-stretch"
        ref={horizontalLayoutRef}
      >
        <a
          href="/dashboard"
          aria-label="Dashboard"
          className="text-secondary px-l flex items-center"
        >
          <Icon icon="vaadin:dashboard" style={iconStyle} />
        </a>
        <a href="/orders" aria-label="Orders" className="text-secondary px-l flex items-center">
          <Icon icon="vaadin:cart" style={iconStyle} />
        </a>
        <a
          href="/customers"
          aria-label="Customers"
          className="text-secondary px-l flex items-center"
        >
          <Icon icon="vaadin:user-heart" style={iconStyle} />
        </a>
        <a href="/products" aria-label="Products" className="text-secondary px-l flex items-center">
          <Icon icon="vaadin:package" style={iconStyle} />
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
