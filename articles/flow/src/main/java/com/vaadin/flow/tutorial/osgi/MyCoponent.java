package com.vaadin.flow.tutorial.osgi;

import org.osgi.service.component.annotations.Component;

import com.vaadin.flow.component.dependency.JavaScript;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.osgi.support.OsgiVaadinStaticResource;
import com.vaadin.flow.tutorial.annotations.CodeFor;

@CodeFor("osgi/tutorial-osgi-components.asciidoc")
@JavaScript("src/my-component.js")
public class MyCoponent extends Div {

    @Component
    // @formatter:off
    public  class MyComponentResource implements OsgiVaadinStaticResource {
    // @formatter:on

        @Override
        public String getPath() {
            return "/META-INF/resources/frontend/src/my-component.js";
        }

        @Override
        public String getAlias() {
            return "/frontend/src/my-component.js";
        }

    }
}
