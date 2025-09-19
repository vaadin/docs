import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { useSignal } from '@vaadin/hilla-react-signals';
import { Button } from '@vaadin/react-components/Button.js';
import { LoginOverlay } from '@vaadin/react-components/LoginOverlay.js';

function Example() {
  useSignals(); // hidden-source-line
  const loginOpened = useSignal(false);

  return (
    <>
      {/* tag::snippet[] */}
      <Button
        theme="primary"
        onClick={() => {
          loginOpened.value = true;
        }}
      >
        Log in
      </Button>

      <LoginOverlay
        opened={loginOpened.value}
        onLogin={() => {
          loginOpened.value = false;
        }}
      />
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example); // hidden-source-line
