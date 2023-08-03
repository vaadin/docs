import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import './example-cleanup'; // hidden-source-line
import { CookieConsent } from '@hilla/react-components/CookieConsent.js';

function Example() {
  return (
    // tag::snippet[]
    <CookieConsent
      message="Tämä sivusto käyttää evästeitä parhaan kokemuksen tarjoamiseksi"
      dismiss="Selvä"
      learnMore="Lue lisää"
      learnMoreLink="https://vaadin.com/terms-of-service"
    />
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
