/**
 * Copyright (C) 2018 Vaadin Ltd
 *
 * This program is available under Commercial Vaadin Add-On License 3.0
 * (CVALv3).
 *
 * See the file licensing.txt distributed with this software for more
 * information about licensing.
 *
 * You should have received a copy of the license along with this program.
 * If not, see <http://vaadin.com/license/cval-3>.
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
