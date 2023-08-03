import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { Tabs } from '@hilla/react-components/Tabs.js';
import { Tab } from '@hilla/react-components/Tab.js';

const badgeStyle = {
  marginInlineStart: 'var(--lumo-space-s)',
};

function Example() {
  return (
    // tag::snippet[]
    <Tabs>
      <Tab>
        <span>Inbox</span>
        <span
          {...{ theme: 'badge contrast pill small' }}
          style={badgeStyle}
          aria-label="12 unread messages"
          title="12 unread messages"
        >
          12
        </span>
      </Tab>
      <Tab>
        <span>Important</span>
        <span
          {...{ theme: 'badge contrast pill small' }}
          style={badgeStyle}
          aria-label="3 unread messages"
          title="3 unread messages"
        >
          3
        </span>
      </Tab>
      <Tab>
        <span>Spam</span>
        <span
          {...{ theme: 'badge contrast pill small' }}
          style={badgeStyle}
          aria-label="45 unread messages"
          title="45 unread messages"
        >
          45
        </span>
      </Tab>
      <Tab>
        <span>Archive</span>
        <span
          {...{ theme: 'badge contrast pill small' }}
          style={badgeStyle}
          aria-label="23 unread messages"
          title="23 unread messages"
        >
          23
        </span>
      </Tab>
    </Tabs>
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
