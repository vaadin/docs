import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useEffect } from 'react';
import './example-cleanup'; // hidden-source-line
import { CookieConsent } from '@hilla/react-components/CookieConsent.js';

function Example() {
  useEffect(() => {
    document.documentElement.classList.add('cookie-consent-theming');

    return () => {
      document.documentElement.classList.remove('cookie-consent-theming');
    };
  }, []);

  return (
    // tag::snippet[]
    <CookieConsent />
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
