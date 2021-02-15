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
import com.vaadin.flow.router.RouteAlias;
import com.vaadin.flow.router.RouteParameterRegex;
import com.vaadin.flow.router.RouteParameters;
import com.vaadin.flow.router.RoutePrefix;
import com.vaadin.flow.router.RouterLayout;
import com.vaadin.flow.tutorial.annotations.CodeFor;

@CodeFor("routing/tutorial-router-templates.asciidoc")
public class RouteTemplatesRegex {

    /* User profile example */

    @Route("user/:userID?([0-9]{1,9})/edit")
    @RouteAlias("user/:userID?(" + RouteParameterRegex.INTEGER + ")/edit")
    public class UserProfileEdit extends Div implements BeforeEnterObserver {

        private Integer userID;

        @Override
        public void beforeEnter(BeforeEnterEvent event) {
            userID = event.getRouteParameters().getInteger("userID").
                    orElse(CurrentUser.get().getUserID());
        }
    }

    @Route("api/:path*(com|vaadin|flow)")
    public class ApiViewer extends Div implements BeforeEnterObserver {

        private List<String> pathSegments;

        @Override
        public void beforeEnter(BeforeEnterEvent event) {
            pathSegments = event.getRouteParameters().getWildcard("path");
        }
    }

    @Route("items/show")
    public static class ShowAllView extends Div {
    }

    // This route will fail when registered and application is terminated.
    @Route("items/show/:filter?")
    public static class SearchView extends Div {
    }

    @Route("items/:identifier")
    public static class ItemView extends Div {
    }

    @Route(":something?")
    @RouteAlias(":messageID(" + RouteParameterRegex.INTEGER + ")")
    @RouteAlias("last")
    @RoutePrefix("thread")
    public static class ThreadView extends Div implements BeforeEnterObserver {

        private Integer messageID;

        private String something;

        private boolean last;

        @Override
        public void beforeEnter(BeforeEnterEvent event) {
            last = "last".equals(getLastSegment(event));

            messageID = null;
            something = null;

            if (!last) {
                final RouteParameters urlParameters = event.getRouteParameters();

                urlParameters.getInteger("messageID")
                        .ifPresent(value -> messageID = value);
                urlParameters.get("something")
                        .ifPresent(value -> something = value);
            }
        }
    }

    @Route(value = ":path*" , layout = ParentView.class)
    public static class PathView extends Div {
    }

    @Route(value = ":tab(api)/:path*", layout = ParentView.class)
    public static class ApiView extends Div {
    }

    @Route(value = ":tab(overview|samples|links|reviews|discussions)", layout = ParentView.class)
    public static class OthersView extends Div {
    }

    @RoutePrefix("component/:identifier")
    public static class ParentView extends Div implements RouterLayout {
    }


    static class CurrentUser {

        private static final CurrentUser CURRENT_USER = new CurrentUser();

        private Integer userID;

        public static CurrentUser get() {
            return CURRENT_USER;
        }

        public Integer getUserID() {
            return userID;
        }
    }

    private static String getLastSegment(BeforeEnterEvent beforeEnterEvent) {
        final List<String> segments = beforeEnterEvent.getLocation().getSegments();
        return segments.get(segments.size() - 1);
    }

}

