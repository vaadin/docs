import { reactExample } from 'Frontend/demo/react-example';
import React from 'react';
import { EmailField } from '@hilla/react-components/EmailField.js';

function Example() {
  return (
    <>
      {/* tag::snippet[] */}
      <EmailField
        pattern="^.+@example\\.com$"
        required
        label="Email address"
        errorMessage="Enter a valid example.com email address"
        helperText="Only example.com addresses allowed"
      />
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example);
