package com.vaadin.demo.component.login;

import com.vaadin.flow.component.login.LoginForm;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-full-source-line

@Route("login-basic")
public class LoginBasic extends Div {

    public LoginBasic() {
        // Demo purposes only
        getStyle()
            .set("background-color", "var(--lumo-contrast-5pct)")
            .set("display", "flex")
            .set("justify-content", "center")
            .set("padding", "var(--lumo-space-l)");

        // tag::snippet[]
        LoginForm loginForm = new LoginForm();
        add(loginForm);
        // end::snippet[]
    }
    public static class Exporter extends DemoExporter<LoginBasic> {} // hidden-full-source-line
}
