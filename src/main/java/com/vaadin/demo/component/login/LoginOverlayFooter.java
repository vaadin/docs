package com.vaadin.demo.component.login;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.login.LoginOverlay;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Paragraph;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.theme.lumo.LumoUtility;

@Route("login-overlay-footer")
public class LoginOverlayFooter extends Div {

    public LoginOverlayFooter() {
        // tag::snippet[]
        LoginOverlay loginOverlay = new LoginOverlay();
        Paragraph text = new Paragraph("Never tell your password to anyone");
        text.addClassName(LumoUtility.TextAlignment.CENTER);
        loginOverlay.getFooter().add(text);
        // end::snippet[]
        add(loginOverlay);
        loginOverlay.setOpened(true);
        // Prevent the example from stealing focus when browsing the
        // documentation
        loginOverlay.getElement().setAttribute("no-autofocus", "");
    }

    public static class Exporter extends DemoExporter<LoginOverlayFooter> { // hidden-source-line
    } // hidden-source-line
}
