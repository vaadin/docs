import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { EmailField, FormLayout, TextField } from '@vaadin/react-components';

function Example() {
  // tag::snippet[]
  return (
    <FormLayout
      autoResponsive
      labelsAside
      style={{
        '--vaadin-form-layout-label-width': '10em',
        '--vaadin-form-layout-label-spacing': '2em',
      }}
    >
      <TextField label="First name" />
      <TextField label="Last name" />
      <EmailField label="Email address" />
    </FormLayout>
  );
  // end::snippet[]
}

export default reactExample(Example); // hidden-source-line
