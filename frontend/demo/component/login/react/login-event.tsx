import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { useSignal } from '@vaadin/hilla-react-signals';
import type { LoginFormDisabledChangedEvent } from '@vaadin/react-components/LoginForm'; // hidden-source-line
import { LoginForm } from '@vaadin/react-components/LoginForm.js';
import { loginHostStyles } from './login-host-styles';

function Example() {
  useSignals(); // hidden-source-line
  const disabled = useSignal<boolean>(false);

  const onDisabledChanged = (event: LoginFormDisabledChangedEvent) => {
    disabled.value = event.detail.value;
  };

  const onLogin = () => {
    setTimeout(() => {
      disabled.value = false; // Re-enable login button
    }, 1000);
  };

  return (
    <>
      {/* tag::snippet[] */}
      {/* no-autofocus is used to prevent the example from stealing focus when browsing the
      documentation */}
      <LoginForm
        no-autofocus
        disabled={disabled.value}
        onDisabledChanged={onDisabledChanged}
        onLogin={onLogin}
      />
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example, loginHostStyles); // hidden-source-line
