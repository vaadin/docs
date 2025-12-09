import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { EmailField } from '@vaadin/react-components/EmailField.js';
import { HorizontalLayout } from '@vaadin/react-components/HorizontalLayout.js';

function Example() {
  return (
    <HorizontalLayout theme="spacing" style={{ alignItems: 'baseline' }}>
      {/* tag::snippet[] */}
      <EmailField
        label="Email address"
        name="email"
        value="julia.scheider@email.com"
        errorMessage="Enter a valid email address"
        clearButtonVisible
      />

      <EmailField
        label="Email address"
        name="email"
        value="This is not an email"
        errorMessage="Enter a valid email address"
        clearButtonVisible
        invalid
      />
      {/* end::snippet[] */}
    </HorizontalLayout>
  );
}

export default reactExample(Example); // hidden-source-line
