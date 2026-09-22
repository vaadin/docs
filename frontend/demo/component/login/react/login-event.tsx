import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { useSignal } from '@vaadin/hilla-react-signals';
import {
  LoginForm,
  type LoginFormDisabledChangedEvent,
} from '@vaadin/react-components/LoginForm.js';
import { loginHostStyles } from './login-host-styles';

function Example() {
  useSignals(); // hidden-source-line
  const disabled = useSignal<boolean>(false);

  return (
    <>
      {/* tag::snippet[] */}
      {/* no-autofocus is used to prevent the example from stealing focus when browsing the
      documentation */}
      <LoginForm
        no-autofocus
        disabled={disabled.value}
        onDisabledChanged={(event: LoginFormDisabledChangedEvent) => {
          disabled.value = event.detail.value;
        }}
        onLogin={() => {
          setTimeout(() => {
            disabled.value = false; // Re-enable login button
          }, 1000);
        }}
      />
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example, loginHostStyles); // hidden-source-line
