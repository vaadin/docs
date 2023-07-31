import { reactExample } from 'Frontend/demo/react-example';
import React, { useRef, useEffect } from 'react';
import { LoginOverlay } from '@hilla/react-components/LoginOverlay.js';

function Example() {
  const loginRef = useRef(null);

  useEffect(() => {
    loginRef.current.i18n = {
      ...loginRef.current.i18n,
      additionalInformation: `Contact admin@company.com if you're experiencing issues logging into your account`,
    };
  }, []);

  return <LoginOverlay ref={loginRef} opened />;
}

export default reactExample(Example);
