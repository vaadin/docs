import { useSignal } from '@vaadin/hilla-react-signals';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { LoginOverlay } from '@vaadin/react-components/LoginOverlay.js';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './auth';
import { ViewConfig } from "@vaadin/hilla-file-router/types.js";

export const config: ViewConfig = {
    menu: { exclude: true}
}

// tag::snippet[]
export default function LoginView() {
  useSignals(); // hidden-source-line
  const { login } = useAuth();
  const hasError = useSignal<boolean>(false);

  return (
    <LoginOverlay
      opened
      error={hasError.value}
      noForgotPassword
      onLogin={async ({ detail: { username, password } }) => {
        const { error } = await login(username, password);
        hasError.value = Boolean(error);
      }}
    />
  );
}
// end::snippet[]
