import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import './example-cleanup'; // hidden-source-line
import { CookieConsent } from '@hilla/react-components/CookieConsent.js';

function Example() {
  return (
    <>
      {/* tag::snippet[] */}
      <CookieConsent />
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example); // hidden-source-line
