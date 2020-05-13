package com.vaadin.flow.tutorial.pwa;

import com.vaadin.flow.component.page.AppShellConfigurator;
import com.vaadin.flow.server.PWA;
import com.vaadin.flow.tutorial.annotations.CodeFor;

@CodeFor("pwa/tutorial-pwa-icons.asciidoc")
public class MyPWA1 {

    @PWA(name = "My Progressive Web Application",
         shortName = "MyPWA",
         iconPath = "img/icons/logo.png")
    public class AppShell implements AppShellConfigurator {
    }
}
