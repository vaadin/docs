import { reactExample } from 'Frontend/demo/react-example';
import React, { useEffect } from 'react';
import { CookieConsent } from '@hilla/react-components/CookieConsent.js';

function Example() {
  useEffect(() => {
    document.documentElement.classList.add('cookie-consent-theming');

    return () => {
      document.documentElement.classList.remove('cookie-consent-theming');
    };
  }, []);

  return (
    <>
      {/* tag::snippet[] */}
      <CookieConsent />
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example);
