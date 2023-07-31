import { reactExample } from 'Frontend/demo/react-example';
import React from 'react';
import { NotificationCard } from '@hilla/react-components/NotificationCard.js';

function Example() {
  return (
    <NotificationCard theme="success" slot="middle">
      Application submitted!
    </NotificationCard>
  );
}

export default reactExample(Example);
