package com.vaadin.demo.component.login;

import com.vaadin.flow.component.login.LoginOverlay;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("login-validation")
public class LoginValidation extends Div {

    public LoginValidation() {
        // tag::snippet[]
        LoginOverlay loginOverlay = new LoginOverlay();
        add(loginOverlay);
        // end::snippet[]
    }

    public static class Exporter extends DemoExporter<LoginValidation> { // hidden-source-line
    } // hidden-source-line
}
