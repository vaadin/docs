import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { Badge, HorizontalLayout } from '@vaadin/react-components';

function Example() {
  return (
    <HorizontalLayout theme="spacing">
      {/* tag::snippet[] */}
      <Badge theme="dot">Pending</Badge>
      <Badge theme="dot success">Confirmed</Badge>
      <Badge theme="dot warning">Warning</Badge>
      <Badge theme="dot error">Denied</Badge>
      {/* end::snippet[] */}
    </HorizontalLayout>
  );
}

export default reactExample(Example); // hidden-source-line
