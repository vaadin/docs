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

import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.router.RouterLayout;
import com.vaadin.mpr.LegacyWrapper;
import com.vaadin.mpr.MprRouteAdapter;
import com.vaadin.mpr.documentation.annotations.CodeFor;
import com.vaadin.navigator.View;
import com.vaadin.navigator.ViewChangeListener;
import com.vaadin.ui.Button;
import com.vaadin.ui.HorizontalLayout;

@CodeFor("introduction/step-3-navigator.asciidoc")
public class NavigationFlow {

    // Flow layout, used by the router
    public class MainLayout extends VerticalLayout implements RouterLayout {
        public MainLayout() {
            add(new LegacyWrapper(new MainMenu()));
        }
    }

    // Legacy Vaadin 7 layout
    public class MainMenu extends HorizontalLayout {
        public MainMenu() {
            Button home = new Button("Home",
                    event -> getUI().getNavigator().navigateTo(""));
            Button away = new Button("Away",
                    event -> getUI().getNavigator().navigateTo("away"));
            Button flow = new Button("Flow",
                    event -> getUI().getNavigator().navigateTo("flow"));

            addComponents(home, away);
            addComponents(home, away, flow);
        }
    }

    @Route(value = "away", layout = MainLayout.class)
    public class AwayRoute extends MprRouteAdapter<AwayView> {
    }

    private class AwayView implements View {
        @Override
        public void enter(ViewChangeListener.ViewChangeEvent viewChangeEvent) {
            // NO-OP
        }
    }
}
