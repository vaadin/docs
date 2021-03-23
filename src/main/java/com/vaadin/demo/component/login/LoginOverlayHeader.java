package com.vaadin.demo.component.login;

import com.vaadin.flow.component.login.LoginOverlay;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-full-source-line

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
    }
    public static class Exporter extends DemoExporter<LoginOverlayHeader> {} // hidden-full-source-line
}
