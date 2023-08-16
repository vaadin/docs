import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import { loginHostStyles } from './login-host-styles'; // hidden-source-line
import React from 'react';
import { LoginForm } from '@hilla/react-components/LoginForm.js';

// tag::snippet[]
const i18n = {
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
};

function Example() {
  return (
    <>
      {/* no-autofocus is used to prevent the example from stealing focus when browsing the documentation */}
      <LoginForm i18n={i18n} no-autofocus />
    </>
  );
}
// end::snippet[]

export default reactExample(Example, loginHostStyles); // hidden-source-line
