package com.vaadin.flow.tutorial.advanced;

import com.vaadin.flow.component.Composite;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.page.AppShellConfigurator;
import com.vaadin.flow.component.page.LoadingIndicatorConfiguration;
import com.vaadin.flow.router.RouterLayout;
import com.vaadin.flow.server.AppShellSettings;
import com.vaadin.flow.server.InitialPageSettings;
import com.vaadin.flow.server.PageConfigurator;
import com.vaadin.flow.server.ServiceInitEvent;
import com.vaadin.flow.server.VaadinServiceInitListener;
import com.vaadin.flow.tutorial.annotations.CodeFor;

import java.util.Optional;

@CodeFor("advanced/tutorial-loading-indicator.asciidoc")
public class AppShell implements AppShellConfigurator, VaadinServiceInitListener {

    // other implementation omitted
    @Override
    public void serviceInit(ServiceInitEvent serviceInitEvent) {
        serviceInitEvent.getSource().addUIInitListener(uiInitEvent -> {
            LoadingIndicatorConfiguration conf = uiInitEvent.getUI().getLoadingIndicatorConfiguration();

            // disable default theme -> loading indicator will not be shown
            conf.setApplyDefaultTheme(false);

            /*
             * Delay for showing the indicator and setting the 'first' class name.
             */
            conf.setFirstDelay(300); // 300ms is the default

            /* Delay for setting the 'second' class name */
            conf.setSecondDelay(1500); // 1500ms is the default

            /* Delay for setting the 'third' class name */
            conf.setThirdDelay(5000); // 5000ms is the default
        });
    }
}

