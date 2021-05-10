import 'Frontend/demo/init'; // hidden-source-line
import { html, LitElement, customElement, css } from 'lit-element';
import '@vaadin/vaadin-login/vaadin-login-form';
import { LoginI18n } from '@vaadin/vaadin-login';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('login-internationalization')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  static get styles() {
    return css`
      :host {
        background-color: var(--lumo-contrast-5pct);
        display: flex !important;
        justify-content: center;
        padding: var(--lumo-space-l);
      }
    `;
  }

  //tag::snippet[]
  private i18n: LoginI18n = {
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
  };

  render() {
    return html`<vaadin-login-form .i18n="${this.i18n}"></vaadin-login-form>`;
  }
  //end::snippet[]
}
