import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useState } from 'react';
import { Button } from '@hilla/react-components/Button.js';
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
      />
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example); // hidden-source-line
