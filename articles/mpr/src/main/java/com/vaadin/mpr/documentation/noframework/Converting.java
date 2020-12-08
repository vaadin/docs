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

import com.vaadin.annotations.Theme;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;
import com.vaadin.mpr.LegacyWrapper;
import com.vaadin.mpr.core.LegacyUI;
import com.vaadin.mpr.documentation.annotations.CodeFor;
import com.vaadin.mpr.documentation.configuration.CustomUI.MyCustomUI;
import com.vaadin.server.VaadinRequest;
import com.vaadin.ui.HorizontalLayout;
import com.vaadin.ui.UI;

@CodeFor("introduction/step-3-no-framework.asciidoc")
public class Converting {

    @Theme("valo")
    public class AddressbookUI extends UI {
        private HorizontalLayout content = new HorizontalLayout();

        @Override
        protected void init(VaadinRequest vaadinRequest) {
            content.setSizeFull();
            setContent(content);
        }
    }

    @Route("")
    public class AddressbookLayout extends Div {
        private HorizontalLayout content = new HorizontalLayout();

        public AddressbookLayout() {
            content.setSizeFull();
            add(new LegacyWrapper(content));
        }
    }

    @Route("")
    @LegacyUI(MyCustomUI.class)
    public class MainLayout extends Div {
        protected void init() {
            add(new com.vaadin.flow.component.html.NativeButton(
                    "Flow button that adds a FW7 Label", e -> {
                        add(new LegacyWrapper(
                                new com.vaadin.ui.Label("Legacy label")));
                    }));
            add(new LegacyWrapper(new com.vaadin.ui.NativeButton(
                    "Legacy button that adds a Flow Label", e -> {
                        add(new com.vaadin.flow.component.html.Label(
                                "Flow label"));
                    })));

        }
    }
}
