package com.vaadin.flow.tutorial.advanced;

import javax.servlet.annotation.WebInitParam;
import javax.servlet.annotation.WebServlet;

import com.vaadin.flow.server.VaadinServlet;
import com.vaadin.flow.server.VaadinServletConfiguration;
import com.vaadin.flow.tutorial.annotations.CodeFor;

@WebServlet(urlPatterns = "/*", name = "myservlet", asyncSupported = true, initParams = {
        @WebInitParam(name = "frontend.url.es6", value = "http://mydomain.com/es6/"),
        @WebInitParam(name = "frontend.url.es5", value = "http://mydomain.com/es5/") })
@VaadinServletConfiguration(productionMode = false)
@CodeFor("advanced/tutorial-flow-runtime-configuration.asciidoc")
public class MyServlet extends VaadinServlet {
}
