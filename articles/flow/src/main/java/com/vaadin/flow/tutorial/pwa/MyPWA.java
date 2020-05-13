package com.vaadin.flow.tutorial.pwa;

import com.vaadin.flow.component.page.AppShellConfigurator;
import com.vaadin.flow.server.PWA;
import com.vaadin.flow.tutorial.annotations.CodeFor;

@CodeFor("pwa/tutorial-pwa-pwa-with-flow.asciidoc")
public class MyPWA {

    @PWA(name = "My Progressive Web Application",
         shortName = "MyPWA")
    public class AppShell implements AppShellConfigurator {
    }
}
