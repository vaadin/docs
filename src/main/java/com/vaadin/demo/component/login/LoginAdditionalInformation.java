package com.vaadin.demo.component.login;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.login.LoginI18n;
import com.vaadin.flow.component.login.LoginOverlay;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;

@Route("login-additional-information")
public class LoginAdditionalInformation extends Div {

    public LoginAdditionalInformation() {
        // tag::snippet[]
        LoginI18n i18n = LoginI18n.createDefault();
        i18n.setAdditionalInformation("Please, contact admin@company.com if you're experiencing issues logging into your account");

        LoginOverlay loginOverlay = new LoginOverlay();
        loginOverlay.setI18n(i18n);
        // end::snippet[]
        add(loginOverlay);
        loginOverlay.setOpened(true);
    }
    public static class Exporter extends DemoExporter<LoginAdditionalInformation> {} // hidden-source-line
}
