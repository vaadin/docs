package com.vaadin.flow.tutorial.embeddingflowapplications;

import com.vaadin.flow.server.VaadinServlet;
import com.vaadin.flow.tutorial.annotations.CodeFor;

import javax.servlet.annotation.WebServlet;

@CodeFor("embedding-flow-applications/tutorial-webcomponent-compatibility.asciidoc")
@WebServlet(urlPatterns = {"/vaadin/*", "/VAADIN/*", "/frontend/*"})
public class CompatibilityVaadinServlet extends VaadinServlet {
}
