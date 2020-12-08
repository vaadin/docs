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
import com.vaadin.mpr.LegacyWrapper;
import com.vaadin.mpr.core.HasLegacyComponents;
import com.vaadin.mpr.documentation.annotations.CodeFor;
import com.vaadin.ui.Button;
import com.vaadin.ui.VerticalLayout;

@CodeFor("configuration/adding-legacy-components.asciidoc")
public class AddingFwComponents extends Div {

    public void legacyWrapper() {
        Button button = new Button("Legacy button");
        add(new LegacyWrapper(button));

        // Vaadin 7 or 8 VerticalLayout
        VerticalLayout legacyLayout = new VerticalLayout();
        LegacyWrapper wrapper = new LegacyWrapper(legacyLayout);
        wrapper.setSizeFull();
        add(wrapper);
    }

    // Flow layout
    public class MainLayout extends Div implements HasLegacyComponents {

        public MainLayout() {
            Button button = new Button("Legacy button");
            add(button); // no wrapping is needed
        }
    }

}
