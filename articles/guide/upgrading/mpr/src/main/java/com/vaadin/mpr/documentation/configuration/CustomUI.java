package com.vaadin.mpr.documentation.configuration;

import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;
import com.vaadin.mpr.MprUI;
import com.vaadin.mpr.core.LegacyUI;
import com.vaadin.mpr.documentation.annotations.CodeFor;
import com.vaadin.server.VaadinRequest;

@CodeFor("configuration/custom-ui.asciidoc")
public class CustomUI {

    public class MyCustomUI extends MprUI {
        @Override
        protected void init(VaadinRequest request) {
            super.init(request);
        }
    }

    @Route("")
    @LegacyUI(MyCustomUI.class)
    public class MainLayout extends Div {

    }

}
