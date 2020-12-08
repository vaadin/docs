package com.vaadin.flow.tutorial.osgi;

import org.osgi.service.component.annotations.Component;

import com.vaadin.flow.osgi.support.OsgiVaadinStaticResource;
import com.vaadin.flow.tutorial.annotations.CodeFor;

@CodeFor("osgi/tutorial-osgi-basic.asciidoc")
@Component
public class MyComponentResource implements OsgiVaadinStaticResource {

    @Override
    public String getPath() {
        return "/META-INF/resources/frontend/my-component.html";
    }

    @Override
    public String getAlias() {
        return "/frontend/my-component.html";
    }

}
