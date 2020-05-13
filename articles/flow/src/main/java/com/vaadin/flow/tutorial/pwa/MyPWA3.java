package com.vaadin.flow.tutorial.pwa;

import com.vaadin.flow.component.page.AppShellConfigurator;
import com.vaadin.flow.server.PWA;
import com.vaadin.flow.tutorial.annotations.CodeFor;

@CodeFor("pwa/tutorial-pwa-web-app-manifest.asciidoc")
public class MyPWA3 {

    @PWA(name = "My Progressive Web Application",
         shortName = "MyPWA",
         manifestPath = "manifest.json")
    public class AppShell implements AppShellConfigurator {
    }
}
