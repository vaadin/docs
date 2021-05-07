package com.vaadin.demo.component.login;

import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.button.ButtonVariant;
import com.vaadin.flow.component.login.LoginOverlay;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-full-source-line

@Route("login-overlay-basic")
public class LoginOverlayBasic extends Div {

    public LoginOverlayBasic() {
        // tag::snippet[]
        LoginOverlay loginOverlay = new LoginOverlay();
        add(loginOverlay);

        Button login = new Button("Log in");
        login.addClickListener(event -> loginOverlay.setOpened(true));
        // end::snippet[]
        login.addThemeVariants(ButtonVariant.LUMO_PRIMARY);
        add(login);
    }
    public static class Exporter extends DemoExporter<LoginOverlayBasic> {} // hidden-full-source-line
}
