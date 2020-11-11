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
package com.vaadin.mpr.documentation.navigation;

import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.router.RouterLayout;
import com.vaadin.mpr.LegacyWrapper;
import com.vaadin.mpr.MprNavigatorRoute;
import com.vaadin.mpr.documentation.annotations.CodeFor;
import com.vaadin.navigator.Navigator;
import com.vaadin.navigator.View;
import com.vaadin.navigator.ViewChangeListener;
import com.vaadin.server.VaadinRequest;
import com.vaadin.ui.CssLayout;
import com.vaadin.ui.HorizontalLayout;
import com.vaadin.ui.UI;
import com.vaadin.ui.VerticalLayout;

@CodeFor("introduction/step-3-navigator.asciidoc")
public class Navigation {

    public class MyUI extends UI {

        @Override
        protected void init(VaadinRequest request) {
            Navigator navigator = new Navigator(this, this);
            navigator.addView("", DefaultView.class);
            navigator.addView("subview", SubView.class);
        }
    }

    @Route("")
    public class Root extends Div {
        private final CssLayout content = new CssLayout();

        public Root() {
            add(new LegacyWrapper(content));

            Navigator navigator = new Navigator(UI.getCurrent(), content);
            navigator.addView("", DefaultView.class);
            navigator.addView("subview", SubView.class);
        }
    }

    private class DefaultView implements View {
        @Override
        public void enter(ViewChangeListener.ViewChangeEvent viewChangeEvent) {
            // NO-OP
        }
    }

    private class SubView implements View {
        @Override
        public void enter(ViewChangeListener.ViewChangeEvent viewChangeEvent) {
            // NO-OP
        }
    }

    public class MyNavigatorUI extends UI {
        @Override
        protected void init(VaadinRequest request) {
            CssLayout viewDisplay = new CssLayout();
            Navigator navigator = new Navigator(this, viewDisplay);

            navigator.addView("", HomeView.class);
            navigator.addView("away", AwayView.class);

            setContent(new VerticalLayout(new MainMenu(), viewDisplay));
        }
    }

    private class HomeView implements View {
        @Override
        public void enter(ViewChangeListener.ViewChangeEvent viewChangeEvent) {
            // NO-OP
        }
    }

    private class AwayView implements View {
        @Override
        public void enter(ViewChangeListener.ViewChangeEvent viewChangeEvent) {
            // NO-OP
        }
    }

    public class MainLayout
            extends com.vaadin.flow.component.orderedlayout.VerticalLayout
            implements RouterLayout {
        // NO-OP
    }

    // Flow router target
    @Route(value = "", layout = MainLayout.class)
    public class MyNavigatorRoute extends MprNavigatorRoute {

        @Override
        public void configureNavigator(Navigator navigator) {
            navigator.addView("", HomeView.class);
            navigator.addView("away", AwayView.class);
        }
    }

    public class MainMenu extends HorizontalLayout {
        // NO-OP
    }

    @Route(value = "flow", layout = MainLayout.class)
    public class FlowView extends Div {
        // Flow view contents.
    }

    public class NavigatorUI extends UI {
        @Override
        protected void init(VaadinRequest request) {
            CssLayout viewDisplay = new CssLayout();
            Navigator navigator = new Navigator(this, viewDisplay);

            navigator.addView("", HomeView.class);
            navigator.addView("away", AwayView.class);

            VerticalLayout content = new VerticalLayout(viewDisplay);
            setContent(content);
        }
    }
}
