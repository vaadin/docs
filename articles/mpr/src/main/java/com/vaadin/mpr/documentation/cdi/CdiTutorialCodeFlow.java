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

import javax.annotation.PostConstruct;

import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;
import com.vaadin.mpr.core.HasLegacyComponents;
import com.vaadin.mpr.documentation.annotations.CodeFor;
import com.vaadin.ui.HorizontalLayout;

@CodeFor("introduction/step-3-cdi.asciidoc")
public class CdiTutorialCodeFlow {

    @Route("")
    public class TodoUI extends Div implements HasLegacyComponents {
        @PostConstruct
        private void buildLayouts() {
            setSizeFull();
            add(new HorizontalLayout());
        }
    }
}
