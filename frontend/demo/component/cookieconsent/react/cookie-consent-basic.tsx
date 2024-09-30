import './example-cleanup'; // hidden-source-line
import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { CookieConsent } from '@vaadin/react-components-pro/CookieConsent.js';

function Example() {
  return (
    // tag::snippet[]
    <CookieConsent />
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
