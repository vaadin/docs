import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { Badge, Tab, Tabs } from '@vaadin/react-components';

const badgeStyle = {
  marginInlineStart: 'var(--vaadin-gap-xs)',
};

function Example() {
  return (
    // tag::snippet[]
    <Tabs>
      <Tab>
        <span>Open</span>
        <Badge number={24} theme="filled" style={badgeStyle} />
      </Tab>

      <Tab>
        <span>Completed</span>
        <Badge number={49} theme="filled" style={badgeStyle} />
      </Tab>

      <Tab>
        <span>Cancelled</span>
        <Badge number={5} theme="filled" style={badgeStyle} />
      </Tab>
    </Tabs>
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
