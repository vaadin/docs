package com.vaadin.flow.tutorial.embeddingflowapplications;

import com.vaadin.flow.component.WebComponentExporter;
import com.vaadin.flow.component.webcomponent.WebComponent;
import com.vaadin.flow.router.PreserveOnRefresh;
import com.vaadin.flow.tutorial.annotations.CodeFor;

@CodeFor("embedding-flow-applications/tutorial-webcomponent-preserveonrefresh.asciidoc")
public class PreservingExporterExample {

    @PreserveOnRefresh
    public class EmbeddedComponentExporter
            extends WebComponentExporter<EmbeddedComponent> {
        public EmbeddedComponentExporter() {
            super("embedded-component");
        }

        @Override
        protected void configureInstance(
                WebComponent<EmbeddedComponent> webComponent,
                EmbeddedComponent component) {
        }
    }


    @PreserveOnRefresh
    public class EmbeddedComponentExporter1
            extends WebComponentExporter<EmbeddedComponent> {
        public EmbeddedComponentExporter1() {
            super("embedded-component-1");
        }

        @Override
        protected void configureInstance(
                WebComponent<EmbeddedComponent> webComponent,
                EmbeddedComponent component) {
        }
    }

    public class EmbeddedComponentExporter2
            extends WebComponentExporter<EmbeddedComponent> {
        public EmbeddedComponentExporter2() {
            super("embedded-component-2");
        }

        @Override
        protected void configureInstance(
                WebComponent<EmbeddedComponent> webComponent,
                EmbeddedComponent component) {
        }
    }
}
