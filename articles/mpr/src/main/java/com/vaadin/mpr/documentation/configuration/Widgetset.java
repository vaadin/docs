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
package com.vaadin.mpr.documentation.configuration;

import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.router.RouterLayout;
import com.vaadin.mpr.LegacyWrapper;
import com.vaadin.mpr.core.MprWidgetset;
import com.vaadin.mpr.documentation.annotations.CodeFor;
import com.vaadin.ui.Panel;

@CodeFor("configuration/legacy-widgetset.asciidoc")
public class Widgetset {

    @MprWidgetset("com.vaadin.mpr.DemoWidgetset")
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
