import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { AppLayout, HorizontalLayout } from '@vaadin/react-components';
import { patchAppLayoutNavigation } from '../app-layout-helper'; // hidden-source-line

const h1Style: React.CSSProperties = {
  fontSize: '1.125rem',
  left: 'var(--vaadin-padding-l)',
  margin: 0,
  position: 'absolute',
};

const linkStyle = {
  display: 'flex',
  alignItems: 'center',
  padding: '0 1rem',
  fontWeight: '500',
  textDecoration: 'none',
};

function Example() {
  return (
    // tag::snippet[]
    <AppLayout>
      <h1 slot="navbar" style={h1Style}>
        MyApp
      </h1>
      <HorizontalLayout
        ref={patchAppLayoutNavigation} // hidden-source-line
        slot="navbar"
        style={{ width: '100%', height: '2.25rem', justifyContent: 'center', gap: '0.5rem' }}
      >
        <a href="/dashboard" style={linkStyle}>
          Dashboard
        </a>
        <a href="/orders" style={linkStyle}>
          Orders
        </a>
        <a href="/customers" style={linkStyle}>
          Customers
        </a>
        <a href="/products" style={linkStyle}>
          Products
        </a>
      </HorizontalLayout>
    </AppLayout>
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
