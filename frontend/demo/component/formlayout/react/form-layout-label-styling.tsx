import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { EmailField, FormItem, FormLayout, TextField } from '@vaadin/react-components';

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
      <FormItem>
        <label slot="label">First name</label>
        <TextField />
      </FormItem>
      <FormItem>
        <label slot="label">Last name</label>
        <TextField />
      </FormItem>
      <FormItem>
        <label slot="label">Email address</label>
        <EmailField />
      </FormItem>
    </FormLayout>
  );
  // end::snippet[]
}

export default reactExample(Example); // hidden-source-line
