import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { Badge, HorizontalLayout } from '@vaadin/react-components';

function Example() {
  return (
    <HorizontalLayout theme="spacing">
      {/* tag::snippet[] */}
      <Badge number={12} theme="number-only">
        New messages
      </Badge>
      <Badge number={3} theme="error number-only">
        Alerts
      </Badge>
      {/* end::snippet[] */}
    </HorizontalLayout>
  );
}

export default reactExample(Example); // hidden-source-line
