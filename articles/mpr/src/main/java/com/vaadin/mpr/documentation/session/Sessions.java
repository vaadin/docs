/**
 * Copyright (C) 2020 Vaadin Ltd
 *
 * This program is available under Commercial Vaadin Developer License
 * 4.0 (CVDLv4).
 *
 *
 * For the full License, see <https://vaadin.com/license/cvdl-4.0>.
 */
package com.vaadin.mpr.documentation.session;

import com.vaadin.flow.component.UI;
import com.vaadin.flow.server.VaadinSession;
import com.vaadin.mpr.documentation.annotations.CodeFor;
import com.vaadin.ui.Button;

@CodeFor("configuration/session.asciidoc")
public class Sessions {

    public void sessionInvalidation() {
        Button close = new Button("Close session", event -> {
            VaadinSession.getCurrent().getSession().invalidate();
            UI.getCurrent().getPage().reload();
        });
    }

}

