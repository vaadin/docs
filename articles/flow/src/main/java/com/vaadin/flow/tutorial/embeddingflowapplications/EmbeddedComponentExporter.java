package com.vaadin.flow.tutorial.embeddingflowapplications;

import com.vaadin.flow.component.WebComponentExporter;
import com.vaadin.flow.component.webcomponent.WebComponent;
import com.vaadin.flow.tutorial.annotations.CodeFor;

@CodeFor("embedding-flow-applications/tutorial-webcomponent-security.asciidoc")
public class EmbeddedComponentExporter
        extends WebComponentExporter<EmbeddedComponent> {

    public EmbeddedComponentExporter() {
        super("my-comp");

        addProperty("token", "")
                .onChange(this::authorize);
    }

    @Override
    protected void configureInstance(
            WebComponent<EmbeddedComponent> webComponent,
            EmbeddedComponent component) {
    }

    private void authorize(EmbeddedComponent component,
                           String token) {
        // check the token
        if (isValidToken(token)) {
            component.init();
        }
    }

    private boolean isValidToken(String token) {
        return true;
    }

}
