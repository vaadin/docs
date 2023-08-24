import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect, useRef } from 'react';
import { LoginOverlay, type LoginOverlayElement } from '@hilla/react-components/LoginOverlay.js';

function Example() {
  // tag::snippet[]
  const loginRef = useRef<LoginOverlayElement>(null);

  useEffect(() => {
    if (loginRef.current) {
      loginRef.current.i18n = {
        ...loginRef.current.i18n,
        additionalInformation: `Contact admin@company.com if you're experiencing issues logging into your account`,
      };
    }
  }, []);

  return <LoginOverlay ref={loginRef} opened />;
  // end::snippet[]
}

export default reactExample(Example); // hidden-source-line
