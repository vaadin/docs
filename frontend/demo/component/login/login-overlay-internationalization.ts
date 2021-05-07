import 'Frontend/demo/init'; // hidden-source-line
import { html, LitElement, customElement } from 'lit-element';
import '@vaadin/vaadin-login/vaadin-login-overlay';
import { LoginI18n } from '@vaadin/vaadin-login/vaadin-login-overlay';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('login-overlay-internationalization')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  //tag::snippet[]
  private i18n: LoginI18n = {
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
    },
    additionalInformation: 'Jos tarvitset lisätietoja käyttäjälle.',
  };

  render() {
    return html`<vaadin-login-overlay .i18n="${this.i18n}" opened></vaadin-login-overlay>`;
  }
  //end::snippet[]
}
