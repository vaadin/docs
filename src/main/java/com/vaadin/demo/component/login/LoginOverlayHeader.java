package com.vaadin.demo.component.login;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.login.LoginOverlay;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;

@Route("login-overlay-header")
public class LoginOverlayHeader extends Div {

    public LoginOverlayHeader() {
        // tag::snippet[]
        LoginOverlay loginOverlay = new LoginOverlay();
        loginOverlay.setTitle("TaskMob");
        loginOverlay.setDescription("Built with ♥ by Vaadin");
        // end::snippet[]
        add(loginOverlay);
        loginOverlay.setOpened(true);
        // Prevent the example from stealing focus when browsing the documentation
        loginOverlay.getElement().setAttribute("no-autofocus", "");
    }
    public static class Exporter extends DemoExporter<LoginOverlayHeader> {} // hidden-source-line
}
