import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { LoginForm } from '@vaadin/react-components/LoginForm.js';
import loginRichContentStyles from './login-rich-content-styles'; // hidden-source-line

function Example() {
  return (
    // tag::snippet[]
    <div className="login-rich-content">
      <LoginForm theme="dark" no-autofocus />
    </div>
    // end::snippet[]
  );
}

export default reactExample(Example, loginRichContentStyles); // hidden-source-line
