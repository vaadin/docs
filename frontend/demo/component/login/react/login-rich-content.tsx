import { reactExample } from 'Frontend/demo/react-example';
import React from 'react';
import { LoginForm } from '@hilla/react-components/LoginForm.js';

function Example() {
  return (
    <>
      {/* tag::snippet[] */}
      {/* See login-rich-content.css */}
      {/* no-autofocus is used to prevent the example from stealing focus when browsing the documentation */}
      <div className="login-rich-content">
        <LoginForm theme="dark" autoFocus={false} />
      </div>
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example);
