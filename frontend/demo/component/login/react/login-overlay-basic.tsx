import { reactExample } from 'Frontend/demo/react-example';
import React, { useState } from 'react';
import { Button } from '@hilla/react-components/Button.js';
import { Login } from '@hilla/react-components/Login.js';
import { LoginOverlay } from '@hilla/react-components/LoginOverlay.js';

function Example() {
  const [loginOpened, setLoginOpened] = useState(false);

  return (
    <>
      {/* tag::snippet[] */}
      <Button
        theme="primary"
        onClick={() => {
          setLoginOpened(true);
        }}
      >
        Log in
      </Button>

      <LoginOverlay
        opened={loginOpened}
        onLogin={() => {
          setLoginOpened(false);
        }}
      >
        <Login />
      </LoginOverlay>
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example);
