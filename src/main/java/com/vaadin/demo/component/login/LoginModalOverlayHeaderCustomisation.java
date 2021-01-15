package com.vaadin.demo.component.login;

import com.vaadin.flow.component.Text;
import com.vaadin.flow.component.login.LoginOverlay;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-full-source-line

@Route("login-modal-overlay-header-customisation")
public class LoginModalOverlayHeaderCustomisation extends Div {

    public LoginModalOverlayHeaderCustomisation() {
        // tag::snippet[]

        LoginOverlay loginOverlay = new LoginOverlay();
        add(loginOverlay);
        // end::snippet[]
    }

    public static class Exporter extends DemoExporter<LoginModalOverlayHeaderCustomisation> { // hidden-full-source-line
    } // hidden-full-source-line
}
