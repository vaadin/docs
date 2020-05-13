package com.vaadin.flow.tutorial.migration;

import com.vaadin.flow.component.UI;
import com.vaadin.flow.server.VaadinRequest;
import com.vaadin.flow.server.VaadinServlet;
import com.vaadin.flow.server.VaadinServletConfiguration;
import com.vaadin.flow.tutorial.annotations.CodeFor;

import javax.servlet.annotation.WebInitParam;
import javax.servlet.annotation.WebServlet;

@CodeFor("migration/3-general-differences.asciidoc")
public class GeneralDifferences {
    @WebServlet(urlPatterns = "/*", name = "myservlet", asyncSupported = true,
// Example on initialization parameter configuration
            initParams = {
                    @WebInitParam(name = "frontend.url.es6", value = "http://mydomain.com/es6/"),
                    @WebInitParam(name = "frontend.url.es5", value = "http://mydomain.com/es5/")})
// The UI configuration is optional
    @VaadinServletConfiguration(ui = MyUI.class, productionMode = false)
    public class MyServlet extends VaadinServlet {
    }

    // this is not necessary anymore, but might help you get started with migration
    public class MyUI extends UI {
        protected void init(VaadinRequest request) {
            // do initial steps here.
            // previously routing
        }
    }
}
