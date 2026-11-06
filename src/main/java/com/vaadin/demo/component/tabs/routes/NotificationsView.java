package com.vaadin.demo.component.tabs.routes;

import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.Route;

@Route(value = "component/tabs/settings/notifications", layout = SettingsLayout.class)
public class NotificationsView extends VerticalLayout {

    public NotificationsView() {
        add("Notifications settings");
    }
}
