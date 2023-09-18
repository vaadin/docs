package com.vaadin.demo.component.login;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.login.LoginOverlay;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.textfield.IntegerField;
import com.vaadin.flow.router.Route;

@Route("login-overlay-custom-form-area")
public class LoginOverlayCustomFormArea extends Div {

    public LoginOverlayCustomFormArea() {
        // tag::snippet[]
        LoginOverlay loginOverlay = new LoginOverlay();
        IntegerField code = new IntegerField("One-time code");
        code.getElement().setAttribute("name", "code");
        loginOverlay.getCustomFormArea().add(code);
        // end::snippet[]
        add(loginOverlay);
        loginOverlay.setOpened(true);
        // Prevent the example from stealing focus when browsing the
        // documentation
        loginOverlay.getElement().setAttribute("no-autofocus", "");
    }

    public static class Exporter extends DemoExporter<LoginOverlayCustomFormArea> { // hidden-source-line
    } // hidden-source-line
}
