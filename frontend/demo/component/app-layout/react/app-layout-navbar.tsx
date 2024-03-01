import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect, useRef } from 'react';
import {
  AppLayout,
  HorizontalLayout,
  type HorizontalLayoutElement,
} from '@vaadin/react-components';
import { patchAppLayoutNavigation } from '../app-layout-helper';

const h1Style: React.CSSProperties = {
  fontSize: 'var(--lumo-font-size-l)',
  left: 'var(--lumo-space-l)',
  margin: 0,
  position: 'absolute',
};

const linkStyle = {
  textDecoration: 'none',
};

function Example() {
  const horizontalLayoutRef = useRef<HorizontalLayoutElement>(null);

  useEffect(() => {
    const horizontalLayout = horizontalLayoutRef.current;
    if (horizontalLayout) {
      patchAppLayoutNavigation(horizontalLayout);
    }
  }, []);

  return (
    // tag::snippet[]
    <AppLayout>
      <h1 slot="navbar" style={h1Style}>
        MyApp
      </h1>
      <HorizontalLayout
        ref={horizontalLayoutRef}
        slot="navbar"
        className="h-m w-full justify-center gap-s"
      >
        <a
          href="/dashboard"
          className="flex items-center px-m text-secondary font-medium"
          style={linkStyle}
        >
          Dashboard
        </a>
        <a
          href="/orders"
          className="flex items-center px-m text-secondary font-medium"
          style={linkStyle}
        >
          Orders
        </a>
        <a
          href="/customers"
          className="flex items-center px-m text-secondary font-medium"
          style={linkStyle}
        >
          Customers
        </a>
        <a
          href="/products"
          className="flex items-center px-m text-secondary font-medium"
          style={linkStyle}
        >
          Products
        </a>
      </HorizontalLayout>
    </AppLayout>
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
