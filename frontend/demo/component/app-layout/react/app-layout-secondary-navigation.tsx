import React from 'react';
import { AppBar } from '@hilla/react-components/AppBar.js';
import { Drawer } from '@hilla/react-components/Drawer.js';
import { Tabs } from '@hilla/react-components/Tabs.js';
import { Tab } from '@hilla/react-components/Tab.js';
import { Icon } from '@hilla/react-components/Icon.js';
import { Toolbar } from '@hilla/react-components/Toolbar.js';
import { Typography } from '@hilla/react-components/Typography.js';

function Example() {
  return (
    <>
      {/* tag::snippet[] */}
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" component="h1">
            MyApp
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer>
        <Tabs orientation="vertical" value={1}>
          <Tab label="Dashboard" icon={<Icon icon="vaadin:dashboard" />}></Tab>
          <Tab label="Orders" icon={<Icon icon="vaadin:cart" />}></Tab>
          <Tab label="Customers" icon={<Icon icon="vaadin:user-heart" />}></Tab>
          <Tab label="Products" icon={<Icon icon="vaadin:package" />}></Tab>
          <Tab label="Documents" icon={<Icon icon="vaadin:records" />}></Tab>
          <Tab label="Tasks" icon={<Icon icon="vaadin:list" />}></Tab>
          <Tab label="Analytics" icon={<Icon icon="vaadin:chart" />}></Tab>
        </Tabs>
      </Drawer>
      <AppBar position="sticky">
        <Toolbar>
          <Drawer.Toggle></Drawer.Toggle>
          <Typography variant="h6" component="h2">
            Orders
          </Typography>
        </Toolbar>
      </AppBar>
      <Tabs>
        <Tab label="All"></Tab>
        <Tab label="Open"></Tab>
        <Tab label="Completed"></Tab>
        <Tab label="Cancelled"></Tab>
      </Tabs>
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example);
