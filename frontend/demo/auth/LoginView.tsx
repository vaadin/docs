import React from 'react';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import type { ViewConfig } from '@vaadin/hilla-file-router/types.js';
import { useSignal } from '@vaadin/hilla-react-signals';
import { LoginOverlay } from '@vaadin/react-components/LoginOverlay.js';
import { useAuth } from './auth';

export const config: ViewConfig = {
  menu: { exclude: true },
};

// tag::snippet[]
export default function LoginView() {
  useSignals(); // hidden-source-line
  const { login } = useAuth();
  const hasError = useSignal(false);

  return (
    <LoginOverlay
      opened
      error={hasError.value}
      noForgotPassword
      onErrorChanged={(event) => {
        hasError.value = event.detail.value;
      }}
      onLogin={async ({ detail: { username, password } }) => {
        const { error } = await login(username, password);
        hasError.value = Boolean(error);
      }}
    />
  );
}
// end::snippet[]
