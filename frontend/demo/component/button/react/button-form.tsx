import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { Button } from '@vaadin/react-components/Button.js';
import { EmailField } from '@vaadin/react-components/EmailField.js';
import { FormLayout } from '@vaadin/react-components/FormLayout.js';
import { HorizontalLayout } from '@vaadin/react-components/HorizontalLayout.js';
import { TextField } from '@vaadin/react-components/TextField.js';
import { VerticalLayout } from '@vaadin/react-components/VerticalLayout.js';

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
