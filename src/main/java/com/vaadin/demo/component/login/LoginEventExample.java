package com.vaadin.demo.component.login;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.login.AbstractLogin;
import com.vaadin.flow.component.login.LoginForm;
import com.vaadin.flow.router.Route;

@Route("login-event")
public class LoginEventExample extends Div {

    public LoginEventExample() {
        // Demo purposes only
        getStyle().set("display", "flex").set("justify-content", "center");

        // tag::snippet[]
        var loginForm = new LoginForm();
        loginForm.addLoginListener(this::onLogin);
        add(loginForm);
        // end::snippet[]
        // Prevent the example from stealing focus when browsing the
        // documentation
        loginForm.getElement().setAttribute("no-autofocus", "");
    }

    private void onLogin(AbstractLogin.LoginEvent loginEvent) {
        var login = loginEvent.getSource();
        try {
            // Demo purposes only
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            // Do nothing
        }
        login.setEnabled(true); // re-enable login button
    }

    public static class Exporter extends DemoExporter<LoginEventExample> { // hidden-source-line
    } // hidden-source-line
}
