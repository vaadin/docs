import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { LoginForm } from '@vaadin/react-components/LoginForm.js';
import { loginHostStyles } from './login-host-styles'; // hidden-source-line

function Example() {
  return (
    <>
      {/* tag::snippet[] */}
      {/* no-autofocus is used to prevent the example from stealing focus when browsing the
      documentation */}
      <LoginForm no-autofocus />
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example, loginHostStyles); // hidden-source-line
