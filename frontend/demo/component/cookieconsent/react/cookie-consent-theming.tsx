import './example-cleanup'; // hidden-source-line
import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import { useEffect } from 'react';
import { CookieConsent } from '@vaadin/react-components-pro/CookieConsent.js';

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
