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
import com.vaadin.flow.router.RouterLayout;
import com.vaadin.mpr.LegacyWrapper;
import com.vaadin.mpr.core.MprTheme;
import com.vaadin.mpr.documentation.annotations.CodeFor;
import com.vaadin.ui.Panel;

@CodeFor("configuration/legacy-theme.asciidoc")
public class Theme {

    @MprTheme("reindeer")
    public class MainLayout extends Div implements RouterLayout {
    }

    @Route(value = "", layout = MainLayout.class)
    public class RootTarget extends Div {
        public RootTarget() {
            LegacyWrapper addressbookWrapper = new LegacyWrapper(
                    new AddressbookLayout());
            add(addressbookWrapper);
        }
    }

    public class AddressbookLayout extends Panel {
    }
}
