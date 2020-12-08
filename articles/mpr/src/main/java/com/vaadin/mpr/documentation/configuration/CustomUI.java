/**
 * Copyright (C) 2020 Vaadin Ltd
 *
 * This program is available under Commercial Vaadin Developer License
 * 4.0 (CVDLv4).
 *
 *
 * For the full License, see <https://vaadin.com/license/cvdl-4.0>.
 */
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
