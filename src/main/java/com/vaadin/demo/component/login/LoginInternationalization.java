package com.vaadin.demo.component.login;

import com.vaadin.flow.component.Text;
import com.vaadin.flow.component.login.LoginOverlay;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-full-source-line

@Route("login-internationalization")
public class LoginInternationalization extends Div {

    public LoginInternationalization() {
        // tag::snippet[]

        LoginOverlay loginOverlay = new LoginOverlay();
        add(loginOverlay);
        // end::snippet[]
    }

    public static class Exporter extends DemoExporter<LoginInternationalization> { // hidden-full-source-line
    } // hidden-full-source-line
}
