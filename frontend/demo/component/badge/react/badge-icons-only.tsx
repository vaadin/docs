import '@vaadin/icons';
import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { Badge, HorizontalLayout, Icon } from '@vaadin/react-components';

function Example() {
  return (
    <HorizontalLayout theme="spacing">
      {/* tag::snippet[] */}
      <Badge theme="success icon-only">
        <Icon icon="vaadin:check" slot="icon" />
        Confirmed
      </Badge>
      <Badge theme="error icon-only">
        <Icon icon="vaadin:close-small" slot="icon" />
        Cancelled
      </Badge>
      {/* end::snippet[] */}
    </HorizontalLayout>
  );
}

export default reactExample(Example); // hidden-source-line
