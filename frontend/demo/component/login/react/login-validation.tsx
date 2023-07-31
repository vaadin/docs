import { reactExample } from 'Frontend/demo/react-example';
import React from 'react';
import { LoginOverlay } from '@hilla/react-components/LoginOverlay.js';

function Example() {
  return (
    <>
      {/* tag::snippet[] */}
      {/* no-autofocus is used to prevent the example from stealing focus when browsing the documentation */}
      <LoginOverlay opened error noAutofocus />
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example);
