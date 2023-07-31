import { reactExample } from 'Frontend/demo/react-example';
import React from 'react';
import { CookieConsent } from '@hilla/react-components/CookieConsent.js';

function Example() {
  return (
    <>
      {/* tag::snippet[] */}
      <CookieConsent
        message="Tämä sivusto käyttää evästeitä parhaan kokemuksen tarjoamiseksi"
        dismiss="Selvä"
        learnMore="Lue lisää"
        learnMoreLink="https://vaadin.com/terms-of-service"
      />
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example);
