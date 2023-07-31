import { reactExample } from 'Frontend/demo/react-example';
import React from 'react';
import { NotificationCard } from '@hilla/react-components/NotificationCard.js';

function Example() {
  return (
    <>
      {/* tag::snippet[] */}
      <NotificationCard theme="contrast" slot="middle">
        5 tasks deleted
      </NotificationCard>
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example);
