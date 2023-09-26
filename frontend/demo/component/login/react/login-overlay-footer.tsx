import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { LoginOverlay } from '@hilla/react-components/LoginOverlay.js';
import { applyTheme } from 'Frontend/generated/theme';

function Example() {
  return (
    // tag::snippet[]
    <LoginOverlay>
      <p slot="footer" className="text-center">
        Never tell your password to anyone
      </p>
    </LoginOverlay>
    // end::snippet[]
  );
}

export default reactExample(Example, applyTheme); // hidden-source-line
