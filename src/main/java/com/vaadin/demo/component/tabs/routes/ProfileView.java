package com.vaadin.demo.component.tabs.routes;

import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.Route;

@Route(value = "component/tabs/settings/profile", layout = SettingsLayout.class)
public class ProfileView extends VerticalLayout {

    public ProfileView() {
        add("Profile settings");
    }
}
