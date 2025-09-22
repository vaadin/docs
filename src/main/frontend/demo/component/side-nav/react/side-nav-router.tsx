import React from 'react';
import { useLocation, useNavigate } from 'react-router';
import { SideNav } from '@vaadin/react-components/SideNav.js';
import { SideNavItem } from '@vaadin/react-components/SideNavItem.js';

function Example() {
  // tag::snippet[]
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <SideNav
      location={location}
      onNavigate={({ path }) => {
        if (path) {
          navigate(path);
        }
      }}
    >
      <SideNavItem path="/inbox">Inbox</SideNavItem>
      <SideNavItem path="/calendar">Calendar</SideNavItem>
    </SideNav>
  );
  // end::snippet[]
}
