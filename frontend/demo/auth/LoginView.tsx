import { useSignal } from '@vaadin/hilla-react-signals';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { LoginOverlay } from '@vaadin/react-components/LoginOverlay.js';
import { Navigate } from 'react-router-dom';
import { useAuth } from './auth';

// tag::snippet[]
export default function LoginView() {
  useSignals(); // hidden-source-line
  const { state, login } = useAuth();
  const hasError = useSignal<boolean>(false);
  const url = useSignal<string>('');

  if (state.user && url.value) {
    const path = new URL(url.value, document.baseURI).pathname;
    return <Navigate to={path} replace />;
  }

  return (
    <LoginOverlay
      opened
      error={hasError.value}
      noForgotPassword
      onLogin={async ({ detail: { username, password } }) => {
        const { defaultUrl, error, redirectUrl } = await login(username, password);

        if (error) {
          hasError.value = true;
        } else {
          url.value = redirectUrl ?? defaultUrl ?? '/';
        }
      }}
    />
  );
}
// end::snippet[]
