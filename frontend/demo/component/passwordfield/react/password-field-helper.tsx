import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { PasswordField } from '@hilla/react-components/PasswordField.js';

function Example() {
  return (
    <>
      {/* tag::snippet[] */}
      <PasswordField
        label="Password"
        helperText="A password must be at least 8 characters.
        It has to have at least one letter and one digit."
        pattern="^(?=.*[0-9])(?=.*[a-zA-Z]).{8}.*$"
        errorMessage="Not a valid password"
      />
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example); // hidden-source-line
