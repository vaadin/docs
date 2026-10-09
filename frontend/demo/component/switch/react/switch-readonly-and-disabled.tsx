import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { Switch } from '@vaadin/react-components/Switch.js';
import { VerticalLayout } from '@vaadin/react-components/VerticalLayout.js';

function Example() {
  return (
    <VerticalLayout theme="spacing">
      {/* tag::snippet[] */}
      <Switch
        label="Audit log retention (90 days)"
        helperText="Included on the Business plan"
        readonly
        checked
      />

      <Switch label="Daily digest" disabled />
      {/* end::snippet[] */}
    </VerticalLayout>
  );
}

export default reactExample(Example); // hidden-source-line
