package com.vaadin.demo.component.login;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.login.LoginForm;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;

@Route("login-rich-content")
public class LoginRichContent extends Div {

    public LoginRichContent() {
        // tag::snippet[]
        // See login-rich-content.css
        addClassName("login-rich-content");

        LoginForm loginForm = new LoginForm();
        loginForm.getElement().getThemeList().add("dark");
        // end::snippet[]
        add(loginForm);
        // Prevent the example from stealing focus when browsing the
        // documentation
        loginForm.getElement().setAttribute("no-autofocus", "");
        // hidden-source-line - set color-scheme on the exported WC for Aura
        getElement().executeJs( // hidden-source-line
                "this.getRootNode().host.style.colorScheme='dark'"); // hidden-source-line
    }

    public static class Exporter extends DemoExporter<LoginRichContent> { // hidden-source-line
    } // hidden-source-line
}
