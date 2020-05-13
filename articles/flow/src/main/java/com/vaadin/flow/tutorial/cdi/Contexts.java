/*
 * Copyright 2000-2017 Vaadin Ltd.
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
package com.vaadin.flow.tutorial.cdi;

import com.vaadin.cdi.annotation.NormalRouteScoped;
import com.vaadin.cdi.annotation.NormalUIScoped;
import com.vaadin.cdi.annotation.RouteScopeOwner;
import com.vaadin.cdi.annotation.RouteScoped;
import com.vaadin.cdi.annotation.VaadinSessionScoped;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.router.RoutePrefix;
import com.vaadin.flow.router.RouterLayout;
import com.vaadin.flow.tutorial.annotations.CodeFor;

import javax.enterprise.event.Observes;
import javax.enterprise.event.Reception;
import javax.inject.Inject;
import java.util.UUID;

import static javax.enterprise.event.Reception.IF_EXISTS;

@CodeFor("cdi/tutorial-cdi-contexts.asciidoc")
public class Contexts {

    public static class SessionScope {
        @Route("")
        public class MainLayout extends Div {
            @Inject
            public MainLayout(SessionService bean) {
                setText(bean.getText());
            }
        }

        @Route("editor")
        public class Editor extends Div {
            @Inject
            public Editor(SessionService bean) {
                setText(bean.getText());
            }
        }

        @VaadinSessionScoped
        public class SessionService {
            private String uid = UUID.randomUUID().toString();

            public String getText() {
                return "session " + uid;
            }
        }
    }

    public static class NormalUIScope {
        @Route("")
        public class MainLayout extends Div {
            @Inject
            public MainLayout(UIService bean) {
                setText(bean.getText());
            }

            public void edit() {
                getUI().get().navigate("editor");
            }
        }

        @Route("editor")
        public class Editor extends Div {
            @Inject
            public Editor(UIService bean) {
                setText(bean.getText());
            }
        }

        @NormalUIScoped
        public class UIService {
            private String uid = UUID.randomUUID().toString();

            public String getText() {
                return "ui " + uid;
            }
        }
    }

    public static class RouteScope {
        @Route("")
        @RoutePrefix("parent")
        public class ParentView extends Div
                implements RouterLayout {
            @Inject
            public ParentView(
                    @RouteScopeOwner(ParentView.class)
                            RouteService routeService) {
                setText(routeService.getText());
            }
        }

        @Route(value = "child-a", layout = ParentView.class)
        public class ChildAView extends Div {
            @Inject
            public ChildAView(
                    @RouteScopeOwner(ParentView.class)
                            RouteService routeService) {
                setText(routeService.getText());
            }
        }

        @Route(value = "child-b", layout = ParentView.class)
        public class ChildBView extends Div {
            @Inject
            public ChildBView(
                    @RouteScopeOwner(ParentView.class)
                            RouteService routeService) {
                setText(routeService.getText());
            }
        }

        @NormalRouteScoped
        @RouteScopeOwner(ParentView.class)
        public class RouteService {
            private String uid = UUID.randomUUID().toString();

            public String getText() {
                return "ui " + uid;
            }
        }

        @Route("scoped")
        @RouteScoped
        public class ScopedView extends Div {
            private void onMessage(
                    @Observes(notifyObserver = IF_EXISTS)
                            MessageEvent message) {
                setText(message.getText());
            }
        }
    }

}
