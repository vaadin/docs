package com.vaadin.demo.component.login;

import com.vaadin.flow.component.login.LoginI18n;
import com.vaadin.flow.component.login.LoginOverlay;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-full-source-line

@Route("login-overlay-internationalization")
public class LoginOverlayInternationalization extends Div {

    public LoginOverlayInternationalization() {
        // tag::snippet[]
        LoginI18n i18n = LoginI18n.createDefault();

        LoginI18n.Header i18nHeader = i18n.getHeader();
        i18nHeader.setTitle("Sovelluksen nimi");
        i18nHeader.setDescription("Sovelluksen kuvaus");

        LoginI18n.Form i18nForm = i18n.getForm();
        i18nForm.setTitle("Kirjaudu sisään");
        i18nForm.setUsername("Käyttäjänimi");
        i18nForm.setPassword("Salasana");
        i18nForm.setSubmit("Kirjaudu sisään");
        i18nForm.setForgotPassword("Unohtuiko salasana?");
        i18n.setForm(i18nForm);

        LoginI18n.ErrorMessage i18nErrorMessage = i18n.getErrorMessage();
        i18nErrorMessage.setTitle("Väärä käyttäjätunnus tai salasana");
        i18nErrorMessage.setMessage("Tarkista että käyttäjätunnus ja salasana ovat oikein ja yritä uudestaan.");
        i18n.setErrorMessage(i18nErrorMessage);

        i18n.setAdditionalInformation("Jos tarvitset lisätietoja käyttäjälle.");

        LoginOverlay loginOverlay = new LoginOverlay();
        loginOverlay.setI18n(i18n);
        // end::snippet[]
        add(loginOverlay);
        loginOverlay.setOpened(true);
    }
    public static class Exporter extends DemoExporter<LoginOverlayInternationalization> {} // hidden-full-source-line
}
