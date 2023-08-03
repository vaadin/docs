import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { LoginOverlay } from '@hilla/react-components/LoginOverlay.js';

function Example() {
  // tag::snippet[]
  const i18n = {
    header: {
      title: 'Sovelluksen nimi',
      description: 'Sovelluksen kuvaus',
    },
    form: {
      title: 'Kirjaudu sisään',
      username: 'Käyttäjänimi',
      password: 'Salasana',
      submit: 'Kirjaudu sisään',
      forgotPassword: 'Unohtuiko salasana?',
    },
    errorMessage: {
      title: 'Väärä käyttäjätunnus tai salasana',
      message: 'Tarkista että käyttäjätunnus ja salasana ovat oikein ja yritä uudestaan.',
      username: 'Käyttäjätunnus vaaditaan',
      password: 'Salasana vaaditaan',
    },
    additionalInformation: 'Jos tarvitset lisätietoja käyttäjälle.',
  };

  return (
    <>
      {/* no-autofocus is used to prevent the example from stealing focus when browsing the documentation */}
      <LoginOverlay i18n={i18n} opened no-autofocus />
    </>
  );
  // end::snippet[]
}

export default reactExample(Example); // hidden-source-line
