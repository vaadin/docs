import '@vaadin/icons';
import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { AppLayout, HorizontalLayout, Icon } from '@vaadin/react-components';
import { patchAppLayoutNavigation } from '../app-layout-helper'; // hidden-source-line

const h1Style = {
  fontSize: '1.125rem',
  margin: 'var(--vaadin-padding-m) var(--vaadin-padding-l)',
};

const linkStyle = {
  display: 'flex',
  alignItems: 'center',
  padding: '0 1.5rem',
};

function Example() {
  return (
    // tag::snippet[]
    <AppLayout
      style={{ '--vaadin-app-layout-touch-optimized': 'true' }} // hidden-source-line-trim
    >
      <h1 slot="navbar" style={h1Style}>
        MyApp
      </h1>

      <HorizontalLayout
        slot="navbar touch-optimized"
        style={{ width: '100%', justifyContent: 'space-evenly' }}
        ref={patchAppLayoutNavigation} // hidden-source-line
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
