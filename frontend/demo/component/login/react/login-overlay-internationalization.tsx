import { reactExample } from 'Frontend/demo/react-example';
import React from 'react';
import { LoginI18n } from '@hilla/login';
import { LoginOverlay } from '@hilla/react-components/LoginOverlay.js';

const i18n: LoginI18n = {
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

function Example() {
  return (
    <>
      {/* tag::snippet[] */}
      <LoginOverlay i18n={i18n} opened no autofocus />
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example);
