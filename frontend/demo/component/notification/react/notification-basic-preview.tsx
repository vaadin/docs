import { reactExample } from 'Frontend/demo/react-example';
import React from 'react';
import { NotificationCard } from '@hilla/react-components/NotificationCard.js';

function Example() {
  return (
    <>
      <NotificationCard slot="middle">Financial report generated</NotificationCard>
    </>
  );
}

export default reactExample(Example);
