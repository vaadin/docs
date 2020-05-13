package com.vaadin.flow.tutorial.embeddingflowapplications;

import com.vaadin.flow.component.WebComponentExporter;
import com.vaadin.flow.component.webcomponent.WebComponent;
import com.vaadin.flow.tutorial.annotations.CodeFor;

@CodeFor("embedding-flow-applications/tutorial-webcomponent-exporter.asciidoc")
public class LoginFormExporter
        extends WebComponentExporter<LoginForm> {
    public LoginFormExporter() {
        super("login-form");
        addProperty("userlbl", "")
                .onChange(LoginForm::setUserNameLabel);
        addProperty("pwdlbl", "")
                .onChange(LoginForm::setPasswordLabel);
    }

    @Override
    protected void configureInstance(
            WebComponent<LoginForm> webComponent,
            LoginForm form) {
        form.addLoginListener(() ->
                webComponent.fireEvent("logged-in"));
    }
}