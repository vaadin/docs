import React from 'react';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import type { LoginResult } from '@vaadin/hilla-frontend';
import { signal, useSignal } from '@vaadin/hilla-react-signals';
import { LoginOverlay } from '@vaadin/react-components/LoginOverlay.js';
import { useAuth } from '../auth';

// tag::snippet[]
const sessionExpired = signal(false);
const waiting: Array<(result: LoginResult) => void> = [];

// Called by the InvalidSessionMiddleware once per request that ran into the
// expired session. Opens the overlay, and resolves every waiting caller once
// the user has signed in again, so that all of those calls can be retried.
export async function promptLogin(): Promise<LoginResult> {
  sessionExpired.value = true;
  return new Promise((resolve) => {
    waiting.push(resolve);
  });
}

export default function SessionExpiredLoginOverlay() {
  useSignals(); // hidden-source-line
  const { login } = useAuth();
  const hasError = useSignal(false);

  return (
    <LoginOverlay
      opened={sessionExpired.value}
      error={hasError.value}
      noForgotPassword
      onErrorChanged={(event) => {
        hasError.value = event.detail.value;
      }}
      onLogin={async ({ detail: { username, password } }) => {
        const result = await login(username, password);
        hasError.value = result.error;
        if (!result.error) {
          sessionExpired.value = false;
          waiting.splice(0).forEach((resolve) => resolve(result));
        }
      }}
    />
  );
}
// end::snippet[]
