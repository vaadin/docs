import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { Tab } from '@vaadin/react-components/Tab.js';
import { Tabs } from '@vaadin/react-components/Tabs.js';

const badgeStyle = {
  marginInlineStart: '0.25rem',
};

function Example() {
  return (
    // tag::snippet[]
    <Tabs>
      <Tab>
        <span>Open</span>
        <span {...{ theme: 'badge small contrast' }} style={badgeStyle}>
          24
        </span>
      </Tab>

      <Tab>
        <span>Completed</span>
        <span {...{ theme: 'badge small contrast' }} style={badgeStyle}>
          439
        </span>
      </Tab>

      <Tab>
        <span>Cancelled</span>
        <span {...{ theme: 'badge small contrast' }} style={badgeStyle}>
          5
        </span>
      </Tab>
    </Tabs>
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
