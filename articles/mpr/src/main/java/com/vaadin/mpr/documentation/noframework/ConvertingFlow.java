/**
 * Copyright (C) 2020 Vaadin Ltd
 *
 * This program is available under Commercial Vaadin Developer License
 * 4.0 (CVDLv4).
 *
 *
 * For the full License, see <https://vaadin.com/license/cvdl-4.0>.
 */
package com.vaadin.mpr.documentation.noframework;

import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;
import com.vaadin.mpr.core.HasLegacyComponents;
import com.vaadin.mpr.documentation.annotations.CodeFor;
import com.vaadin.ui.HorizontalLayout;

@CodeFor("introduction/step-3-no-framework.asciidoc")
public class ConvertingFlow {

    @Route("")
    public class AddressbookLayout extends Div implements HasLegacyComponents {
        private HorizontalLayout content = new HorizontalLayout();

        public AddressbookLayout() {
            content.setSizeFull();
            add(content);
        }
    }
}
