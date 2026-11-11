import { useState } from 'react';
import type { ViewConfig } from '@vaadin/hilla-file-router/types.js';
import { LoginForm } from '@vaadin/react-components/LoginForm.js';
import { useAuth } from './auth';

export const config: ViewConfig = {
  skipLayouts: true,
  menu: { exclude: true },
};

export default function LoginView() {
  const { login } = useAuth();
  const [hasError, setHasError] = useState(false);

  return (
    <LoginForm
      error={hasError}
      noForgotPassword
      onLogin={async ({ detail: { username, password } }) => {
        const { error } = await login(username, password);
        setHasError(error);
      }}
    />
  );
}
