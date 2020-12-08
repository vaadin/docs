/**
 * Copyright (C) 2020 Vaadin Ltd
 *
 * This program is available under Commercial Vaadin Developer License
 * 4.0 (CVDLv4).
 *
 *
 * For the full License, see <https://vaadin.com/license/cvdl-4.0>.
 */
package com.vaadin.mpr.documentation.cdi;

import com.vaadin.annotations.Theme;
import com.vaadin.cdi.CDIUI;
import com.vaadin.mpr.documentation.annotations.CodeFor;
import com.vaadin.server.VaadinRequest;
import com.vaadin.ui.HorizontalLayout;
import com.vaadin.ui.UI;

@CodeFor("introduction/step-3-cdi.asciidoc")
public class CdiTutorialCode {

    @CDIUI
    @Theme("valo")
    public class TodoUI extends UI {
        @Override
        protected void init(VaadinRequest vaadinRequest) {
            setContent(new HorizontalLayout());
        }
    }
}
