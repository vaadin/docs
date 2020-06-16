/*
 * Copyright 2000-2020 Vaadin Ltd.
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
package com.vaadin.flow.tutorial.routing;

import java.util.List;

import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.BeforeEnterEvent;
import com.vaadin.flow.router.BeforeEnterObserver;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.tutorial.annotations.CodeFor;

@CodeFor("routing/tutorial-router-templates.asciidoc")
public class RouteTemplatesModifier {

    /* User profile example */

    @Route("user/:userID?/edit")
    public class UserProfileEdit extends Div implements BeforeEnterObserver {

        private String userID;

        @Override
        public void beforeEnter(BeforeEnterEvent event) {
            userID = event.getRouteParameters().get("userID").
                    orElse(CurrentUser.get().getUserID());
        }
    }

    @Route("api/:path*")
    public class ApiViewer extends Div implements BeforeEnterObserver {

        private String path;

        private List<String> pathSegments;


        @Override
        public void beforeEnter(BeforeEnterEvent event) {
            path = event.getRouteParameters().get("path").orElse("");
            pathSegments = event.getRouteParameters().getWildcard("path");
        }
    }


    static class CurrentUser {

        private static final CurrentUser CURRENT_USER = new CurrentUser();

        private String userID;

        public static CurrentUser get() {
            return CURRENT_USER;
        }

        public String getUserID() {
            return userID;
        }
    }

}

