import { LoginOverlay } from '@hilla/react-components/LoginOverlay.js';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './auth';

// tag::snippet[]
export default function LoginView() {
  const { state, login } = useAuth();
  const [hasError, setError] = useState<boolean>();
  const [url, setUrl] = useState<string>();

  if (state.user && url) {
    const path = new URL(url, document.baseURI).pathname;
    return <Navigate to={path} replace />;
  }

  return (
    <LoginOverlay
      opened
      error={hasError}
      noForgotPassword
      onLogin={async ({ detail: { username, password } }) => {
        const { defaultUrl, error, redirectUrl } = await login(username, password);

        if (error) {
          setError(true);
        } else {
          setUrl(redirectUrl ?? defaultUrl ?? '/');
        }
      }}
    />
  );
}
// end::snippet[]
