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

import javax.enterprise.context.SessionScoped;
import javax.servlet.annotation.WebServlet;
import java.io.Serializable;

import com.vaadin.cdi.CdiVaadinServlet;
import com.vaadin.flow.component.html.Anchor;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.mpr.documentation.annotations.CodeFor;
import com.vaadin.ui.CssLayout;

@CodeFor("configuration/mpr-cdi-tutorial.asciidoc")
public class MprCdiTutorial {

    @WebServlet(name = "Flow Servlet", urlPatterns = {
            MyFlowServlet.FLOW_SERVLET_ROOT + "/*" })
    public class MyFlowServlet extends CdiVaadinServlet {
        public static final String FLOW_SERVLET_ROOT = "flow";
    }

    public class SampleV7Component extends CssLayout {
        public SampleV7Component() {
            getUI().getPage().setLocation(MyFlowServlet.FLOW_SERVLET_ROOT);
        }
    }


    public class SampleFlowComponent extends VerticalLayout {
        public SampleFlowComponent() {
            Anchor anchor = new Anchor("/#!home", "Home");
            add(anchor);
        }
    }

    public static class User {
        public void setUsername(String username) {

        }
    }

    @SessionScoped
    public class SecurityContext implements Serializable {
        private User currentUser = new User();

        public boolean signIn(String username, String password) {
            if (username == null || username.isEmpty())
                return false;

            currentUser.setUsername(username);

            return true;
        }
    }
}
