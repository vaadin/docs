import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { EmailField, FormLayout } from '@vaadin/react-components';

function Example() {
  return (
    <FormLayout autoResponsive autoRows>
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
    </FormLayout>
  );
}

export default reactExample(Example); // hidden-source-line
