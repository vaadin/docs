import { reactExample } from 'Frontend/demo/react-example';
import React from 'react';
import { LoginOverlayMockupElement } from './login-overlay-mockup';

interface I18nState {
  additionalInformation: string;
}

function Example() {
  const [i18n, setI18n] = React.useState<I18nState>({
    additionalInformation: `Contact admin@company.com if you're experiencing issues logging into your account`,
  });

  return <LoginOverlayMockupElement {...{ i18n }} />;
}

export default reactExample(Example);
