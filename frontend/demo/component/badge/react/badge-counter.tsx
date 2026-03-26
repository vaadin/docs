import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { Badge, Tab, Tabs } from '@vaadin/react-components';

const badgeStyle = {
  marginInlineStart: 'var(--vaadin-gap-s)',
};

function Example() {
  return (
    // tag::snippet[]
    <Tabs>
      <Tab>
        <span>Inbox</span>
        <Badge number={12} theme="filled number-only" style={badgeStyle}>
          unread messages
        </Badge>
      </Tab>
      <Tab>
        <span>Important</span>
        <Badge number={3} theme="filled number-only" style={badgeStyle}>
          unread messages
        </Badge>
      </Tab>
      <Tab>
        <span>Spam</span>
        <Badge number={45} theme="filled number-only" style={badgeStyle}>
          unread messages
        </Badge>
      </Tab>
      <Tab>
        <span>Archive</span>
        <Badge number={23} theme="filled number-only" style={badgeStyle}>
          unread messages
        </Badge>
      </Tab>
    </Tabs>
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
