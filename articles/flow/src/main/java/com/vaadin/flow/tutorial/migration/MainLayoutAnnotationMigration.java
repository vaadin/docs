package com.vaadin.flow.tutorial.migration;

import com.vaadin.flow.component.page.AppShellConfigurator;
import com.vaadin.flow.server.PWA;
import com.vaadin.flow.tutorial.annotations.CodeFor;

@CodeFor("v15-migration/upgrading-from-vaadin14.asciidoc")
public class MainLayoutAnnotationMigration{
    @PWA(name = "My Vaadin App", shortName = "my-app")
    public class AppShell implements AppShellConfigurator {

    }
}