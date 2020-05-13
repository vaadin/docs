package com.vaadin.flow.tutorial.embeddingflowapplications;

import com.vaadin.flow.component.WebComponentExporter;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.page.Push;
import com.vaadin.flow.component.webcomponent.WebComponent;
import com.vaadin.flow.tutorial.annotations.CodeFor;

@CodeFor("embedding-flow-applications/tutorial-webcomponent-push.asciidoc")
@Push
public class PushComponentExporter
        extends WebComponentExporter<Div> {
    public PushComponentExporter() {
        super("push-component");
    }

    @Override
    protected void configureInstance(WebComponent<Div> webComponent,
            Div component) {

    }
}
