import { reactExample } from 'Frontend/demo/react-example';
import React from 'react';
import { LoginOverlay } from '@hilla/react-components/LoginOverlay.js';

function Example() {
  return (
    <>
      {/* tag::snippet[] */}
      <LoginOverlay error />
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example);
