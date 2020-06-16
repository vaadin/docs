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

import com.vaadin.flow.component.ClickEvent;
import com.vaadin.flow.component.UI;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.textfield.PasswordField;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.router.BeforeEvent;
import com.vaadin.flow.router.HasUrlParameter;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.router.RouteAlias;
import com.vaadin.flow.router.RouteBaseData;
import com.vaadin.flow.router.RouteConfiguration;
import com.vaadin.flow.router.RouteData;
import com.vaadin.flow.router.RouterLayout;
import com.vaadin.flow.server.ServiceInitEvent;
import com.vaadin.flow.server.VaadinServiceInitListener;
import com.vaadin.flow.tutorial.annotations.CodeFor;

@CodeFor("routing/tutorial-router-dynamic-routes.asciidoc")
public class DynamicRoutes {

    @Route("main")
    @RouteAlias("info")
    @RouteAlias("version")
    private class MyRoute extends Div {

        public MyRoute() {
            RouteConfiguration configuration = RouteConfiguration
                    .forSessionScope();

            RouteConfiguration.forSessionScope().setRoute("admin",
                    AdminView.class);

            // parent layouts can be given as a vargargs parameter
            RouteConfiguration.forSessionScope().setRoute("home",
                    HomeView.class, MainLayout.class);

            configuration.setRoute("main", MyRoute.class);
            configuration.setRoute("info", MyRoute.class);
            configuration.setRoute("version", MyRoute.class);
            // No path "admin" will be available
            configuration.removeRoute("admin");

            // No view AdminView will be available
            configuration.removeRoute(AdminView.class);

            // Remove the "/users" path but keep e.g.
            // "/users/123"
            configuration.removeRoute("users", UsersView.class);

            // register the above view during runtime
            if (getCurrentUser().hasAccessToReporting()) {
                RouteConfiguration.forSessionScope()
                        .setAnnotatedRoute(ReportView.class);
            }

            Menu menu = new Menu();

            // add all currently available views
            configuration.getAvailableRoutes()
                    .forEach(menu::addMenuItem);

            // add and remove menu items when routes are added and
            // removed
            configuration.addRoutesChangeListener(event -> {
                // ignoring any route alias changes
                event.getAddedRoutes().stream()
                        .filter(route -> route instanceof RouteData)
                        .forEach(menu::addMenuItem);
                event.getRemovedRoutes().stream()
                        .filter(route -> route instanceof RouteData)
                        .forEach(menu::removeMenuItem);
            });
        }
    }

    public static class User {
        boolean hasAccessToReporting() {
            return true;
        }
    }

    User getCurrentUser() {
        return new User();
    }

    public static class Menu {
        public void addMenuItem(RouteBaseData routeData) {

        }

        public void removeMenuItem(RouteBaseData routeData) {

        }
    }

    public class AdminView extends Div {
    }

    public class UserView extends Div {
    }

    private static class HomeView extends Div {
    }

    private static class UsersView extends Div {
    }

    private static class DBCrudView extends Div {
    }

    @Route(value = "quarterly-report",
            layout = MainLayout.class,
            registerAtStartup = false)
    @RouteAlias(value = "qr", layout = MainLayout.class)
    public class ReportView extends VerticalLayout
            implements HasUrlParameter<String> {
        // implementation omitted

        @Override
        public void setParameter(BeforeEvent beforeEvent, String s) {

        }
    }

    public class MainLayout extends Div
            implements RouterLayout {
        public MainLayout() {
            // Implementation omitted, but could contain
            // a menu.
        }
    }

    @Route("")
    public class LoginPage extends Div {

        private TextField login;
        private PasswordField password;

        public LoginPage() {
            login = new TextField("Login");
            password = new PasswordField("Password");

            Button submit = new Button("Submit",
                    this::handleLogin);

            add(login, password, submit);
        }

        private void handleLogin(
                ClickEvent<Button> buttonClickEvent) {
            // Validation of credentials is skipped

            RouteConfiguration configuration =
                    RouteConfiguration.forSessionScope();

            if ("admin".equals(login.getValue())) {
                configuration.setRoute("", AdminView.class,
                        MainLayout.class);
            } else if ("user".equals(login.getValue())) {
                configuration.setRoute("", UserView.class,
                        MainLayout.class);
            }

            configuration.setAnnotatedRoute(InfoView.class);

            UI.getCurrent().getPage().reload();
        }
    }

    @Route(value = "info", layout = MainLayout.class,
            registerAtStartup = false)
    public class InfoView extends Div {
        public InfoView() {
            add(new Span("This page contains info about "
                    + "the application"));
        }
    }

    public class ApplicationServiceInitListener
            implements VaadinServiceInitListener {

        @Override
        public void serviceInit(ServiceInitEvent event) {
            // add view only during development time
            if (!event.getSource()
                    .getDeploymentConfiguration()
                    .isProductionMode()) {
                RouteConfiguration configuration =
                        RouteConfiguration.forApplicationScope();

                configuration.setRoute("crud",
                        DBCrudView.class);
            }
        }
    }
}
