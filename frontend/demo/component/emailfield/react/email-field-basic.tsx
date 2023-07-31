import { reactExample } from 'Frontend/demo/react-example';
import React from 'react';
import { HorizontalLayout } from '@hilla/react-components/HorizontalLayout.js';
import { EmailField } from '@hilla/react-components/EmailField.js';

function Example() {
  return (
    <HorizontalLayout theme="spacing">
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

export default reactExample(Example);
