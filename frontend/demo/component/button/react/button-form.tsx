import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import {
  Button,
  EmailField,
  FormLayout,
  HorizontalLayout,
  TextField,
  VerticalLayout,
} from '@vaadin/react-components';

function Example() {
  return (
    // tag::snippet[]
    <VerticalLayout theme="spacing">
      <FormLayout responsiveSteps={[{ columns: 2 }]}>
        <TextField label="First name" value="John" />
        <TextField label="Last name" value="Smith" />
        <EmailField label="Email address" value="john.smith@example.com" data-colspan="2" />
      </FormLayout>

      <HorizontalLayout theme="spacing">
        <Button theme="primary">Create account</Button>
        <Button theme="secondary">Cancel</Button>
      </HorizontalLayout>
    </VerticalLayout>
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
