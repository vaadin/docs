package com.vaadin.flow.tutorial.migration;

import com.vaadin.flow.component.dependency.HtmlImport;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.page.Viewport;
import com.vaadin.flow.router.AfterNavigationEvent;
import com.vaadin.flow.router.AfterNavigationObserver;
import com.vaadin.flow.router.RouterLayout;
import com.vaadin.flow.server.InitialPageSettings;
import com.vaadin.flow.server.PageConfigurator;
import com.vaadin.flow.theme.Theme;
import com.vaadin.flow.theme.lumo.Lumo;
import com.vaadin.flow.tutorial.annotations.CodeFor;

@CodeFor("migration/6-theming.asciidoc")
public class Theming {
    @Theme(Lumo.class) // the theme for Vaadin Components. You can omit it for Lumo
    @HtmlImport("styles/shared-styles.html") // the application specific styles
    @Viewport("width=device-width, minimum-scale=1.0, initial-scale=1.0, user-scalable=yes")
    public class MainLayout extends Div implements RouterLayout,
            AfterNavigationObserver, PageConfigurator {

        @Override
        public void configurePage(InitialPageSettings initialPageSettings) {
            // implementation omitted
        }

        @Override
        public void afterNavigation(AfterNavigationEvent afterNavigationEvent) {
            // implementation omitted
        }
    }
}
