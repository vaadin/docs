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

interface NavigateAndReloadProps {
    to: string;
}

const NavigateAndReload : React.FC<NavigateAndReloadProps> = ({ to }) => {
    const navigate = useNavigate();

    useEffect(() => {
        navigate(to, { replace: true });
        // reload a page on log in to update the menu items
        window.location.reload();
    }, [navigate, to]);

    return null;
}

// tag::snippet[]
export default function LoginView() {
  useSignals(); // hidden-source-line
  const { state, login } = useAuth();
  const hasError = useSignal<boolean>(false);
  const url = useSignal<string>('');

  if (state.user && url.value) {
    const path = new URL(url.value, document.baseURI).pathname;
    return <NavigateAndReload to={path} replace />;
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
