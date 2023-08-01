import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { PasswordField } from '@hilla/react-components/PasswordField.js';

function Example() {
  return (
    <>
      {/* tag::snippet[] */}
      <PasswordField
        allowedCharPattern="[A-Za-z0-9]"
        required
        minlength={6}
        maxlength={12}
        label="Password"
        helperText="6 to 12 characters. Only letters A-Z and numbers supported."
      />
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example); // hidden-source-line
