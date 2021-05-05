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
    }
    public static class Exporter extends DemoExporter<LoginRichContent> {} // hidden-source-line
}
