import '@vaadin/icons';
import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { HorizontalLayout, Icon } from '@vaadin/react-components';

function Example() {
  return (
    <HorizontalLayout theme="spacing">
      {/* tag::snippet[] */}
      <Icon
        aria-label="Confirmed"
        icon="vaadin:check"
        style={{ padding: '0.25rem' }}
        theme="badge success"
        title="Confirmed"
      />

      <Icon
        aria-label="Cancelled"
        icon="vaadin:close-small"
        style={{ padding: '0.25rem' }}
        theme="badge error"
        title="Cancelled"
      />
      {/* end::snippet[] */}
    </HorizontalLayout>
  );
}

export default reactExample(Example); // hidden-source-line
