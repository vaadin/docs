import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import type { LoginResult } from '@vaadin/hilla-frontend';
import { signal, useSignal } from '@vaadin/hilla-react-signals';
import { LoginOverlay } from '@vaadin/react-components/LoginOverlay.js';
import { useAuth } from '../auth';

// tag::snippet[]
const sessionExpired = signal(false);

export async function promptLogin(): Promise<LoginResult> {
  sessionExpired.value = true;
  // Never resolves: the page reloads after the login
  return new Promise<LoginResult>(() => undefined);
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
        const { error } = await login(username, password, {
          // Reloads the current page instead of going to the default URL
          navigate: () => window.location.reload(),
        });
        hasError.value = error;
      }}
    />
  );
}
// end::snippet[]
