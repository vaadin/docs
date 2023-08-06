import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { Button } from '@hilla/react-components/Button.js';
import { VerticalLayout } from '@hilla/react-components/VerticalLayout.js';
import { EmailField } from '@hilla/react-components/EmailField.js';
import { TextField } from '@hilla/react-components/TextField.js';
import { HorizontalLayout } from '@hilla/react-components/HorizontalLayout.js';
import { FormLayout } from '@hilla/react-components/FormLayout.js';

function Example() {
  return (
    <>
      {/* tag::snippet[] */}
      <VerticalLayout theme="spacing">
        <FormLayout responsiveSteps={[{ columns: 2 }]}>
          <TextField label="First name" value="John" />
          <TextField label="Last name" value="Smith" />
          <EmailField {...{ colspan: 2 }} label="Email address" value="john.smith@example.com" />
        </FormLayout>

        <HorizontalLayout theme="spacing" style={{ width: '100%', justifyContent: 'flex-end' }}>
          <Button theme="secondary error" style={{ marginInlineEnd: 'auto' }}>
            Delete
          </Button>
          <Button theme="secondary">Cancel</Button>
          <Button theme="primary">Create account</Button>
        </HorizontalLayout>
      </VerticalLayout>
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example); // hidden-source-line
