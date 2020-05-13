package com.vaadin.flow.tutorial.embeddingflowapplications;

import javax.servlet.annotation.WebServlet;

import com.vaadin.flow.server.VaadinServlet;
import com.vaadin.flow.tutorial.annotations.CodeFor;

@CodeFor("embedding-flow-applications/tutorial-webcomponent-exporter.asciidoc")
@WebServlet(urlPatterns = { "/vaadin/*" })
public class WebComponentVaadinServlet extends VaadinServlet {
}
