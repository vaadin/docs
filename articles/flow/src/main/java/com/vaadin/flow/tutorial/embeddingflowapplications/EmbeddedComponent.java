package com.vaadin.flow.tutorial.embeddingflowapplications;

import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.tutorial.annotations.CodeFor;

@CodeFor("embedding-flow-applications/tutorial-webcomponent-security.asciidoc")
public class EmbeddedComponent extends Div {

    public EmbeddedComponent() {
        // Don't retrieve any sensitive data here
        // without granted access (via security token)
    }

    public void init() {
        // Initialize your secured component here
    }
}
