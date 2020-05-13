/*
 * Copyright 2000-2019 Vaadin Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
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
