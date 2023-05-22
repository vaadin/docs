import 'Frontend/demo/init'; // hidden-source-line
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import '@vaadin/login';
import type { LoginI18n } from '@vaadin/login';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('login-overlay-internationalization')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  // tag::snippet[]
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
      username: 'Käyttäjätunnus vaaditaan',
      password: 'Salasana vaaditaan',
    },
    additionalInformation: 'Jos tarvitset lisätietoja käyttäjälle.',
  };

  protected override render() {
    return html`
      <!-- no-autofocus is used to prevent the example from stealing focus when browsing the documentation -->
      <vaadin-login-overlay .i18n="${this.i18n}" opened no-autofocus></vaadin-login-overlay>
    `;
  }
  // end::snippet[]
}
