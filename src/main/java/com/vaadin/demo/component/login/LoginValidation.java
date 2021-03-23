package com.vaadin.demo.component.login;

import com.vaadin.flow.component.login.LoginOverlay;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-full-source-line

@Route("login-validation")
public class LoginValidation extends Div {

    public LoginValidation() {
        LoginOverlay loginOverlay = new LoginOverlay();
        // tag::snippet[]
        loginOverlay.setError(true);
        // end::snippet[]
        add(loginOverlay);
        loginOverlay.setOpened(true);
    }
    public static class Exporter extends DemoExporter<LoginValidation> {} // hidden-full-source-line
}
