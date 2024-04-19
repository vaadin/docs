import { LoginOverlay } from '@vaadin/react-components/LoginOverlay.js';
import React, { useEffect, useState } from 'react';
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
  const { state, login } = useAuth();
  const [hasError, setError] = useState<boolean>();
  const [url, setUrl] = useState<string>();

  if (state.user && url) {
    const path = new URL(url, document.baseURI).pathname;
    return <NavigateAndReload to={path} />;
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
