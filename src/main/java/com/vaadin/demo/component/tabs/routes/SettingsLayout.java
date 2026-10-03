package com.vaadin.demo.component.tabs.routes;

import java.util.HashMap;
import java.util.Map;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.tabs.Tab;
import com.vaadin.flow.component.tabs.Tabs;
import com.vaadin.flow.router.AfterNavigationEvent;
import com.vaadin.flow.router.AfterNavigationObserver;
import com.vaadin.flow.router.RouterLayout;
import com.vaadin.flow.router.RouterLink;

// tag::snippet[]
public class SettingsLayout extends VerticalLayout
        implements RouterLayout, AfterNavigationObserver {

    private final Tabs tabs = new Tabs();
    private final Map<Class<? extends Component>, Tab> tabsByView = new HashMap<>();

    public SettingsLayout() {
        tabs.setAutoselect(false);
        addTab("Profile", ProfileView.class);
        addTab("Notifications", NotificationsView.class);
        add(tabs);
    }

    private void addTab(String text, Class<? extends Component> view) {
        Tab tab = new Tab(new RouterLink(text, view));
        tabsByView.put(view, tab);
        tabs.add(tab);
    }

    @Override
    public void afterNavigation(AfterNavigationEvent event) {
        // The first element of the active chain is the view being shown
        Class<?> view = event.getActiveChain().getFirst().getClass();
        tabs.setSelectedTab(tabsByView.get(view));
    }
}
// end::snippet[]
