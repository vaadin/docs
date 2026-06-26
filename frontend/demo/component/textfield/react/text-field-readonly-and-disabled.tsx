import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { FormLayout, TextField } from '@vaadin/react-components';

function Example() {
  return (
    <FormLayout autoResponsive autoRows>
      {/* tag::snippet[] */}
      <TextField readonly label="Read-only" value="Value" />

      <TextField disabled label="Disabled" />
      {/* end::snippet[] */}
    </FormLayout>
  );
}

export default reactExample(Example); // hidden-source-line
