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
