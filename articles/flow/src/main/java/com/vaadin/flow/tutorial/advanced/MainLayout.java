package com.vaadin.flow.tutorial.advanced;

import com.vaadin.flow.component.Composite;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.page.LoadingIndicatorConfiguration;
import com.vaadin.flow.router.RouterLayout;
import com.vaadin.flow.server.InitialPageSettings;
import com.vaadin.flow.server.PageConfigurator;
import com.vaadin.flow.tutorial.annotations.CodeFor;

@CodeFor("advanced/tutorial-loading-indicator.asciidoc")
public class MainLayout extends Composite<Div> implements PageConfigurator, RouterLayout {

    // other implementation omitted
    @Override
    public void configurePage(InitialPageSettings settings) {
        LoadingIndicatorConfiguration conf = settings.getLoadingIndicatorConfiguration();

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
    }
}

