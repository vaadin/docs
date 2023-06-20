import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import { loginHostStyles } from './login-host-styles'; // hidden-source-line
import React from 'react';
import { LoginForm } from '@hilla/react-components/LoginForm.js';

function Example() {
  return (
    <>
      {/* tag::snippet[] */}
      {/* noAutofocus is used to prevent the example from stealing focus when browsing the
      documentation */}
      <LoginForm noAutofocus />
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example, loginHostStyles); // hidden-source-line
