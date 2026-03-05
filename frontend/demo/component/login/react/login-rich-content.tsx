import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { css } from 'lit'; // hidden-source-line
import { LoginForm } from '@vaadin/react-components/LoginForm.js';

function Example() {
  return (
    // tag::snippet[]
    <div className="login-rich-content">
      <LoginForm theme="dark" no-autofocus />
    </div>
    // end::snippet[]
  );
}

const hostStyles = css`
  :host {
    color-scheme: dark;
  }
`;

export default reactExample(Example, hostStyles); // hidden-source-line
