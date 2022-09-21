package com.vaadin.demo.component.tooltip;

import com.vaadin.flow.component.applayout.AppLayout;
import com.vaadin.flow.component.applayout.DrawerToggle;
import com.vaadin.flow.component.html.H1;
import com.vaadin.flow.component.icon.Icon;
import com.vaadin.flow.component.icon.VaadinIcon;
import com.vaadin.flow.component.tabs.Tab;
import com.vaadin.flow.component.tabs.Tabs;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.router.RouterLink;

@Route("tooltip-positioning")
public class TooltipPositioning extends AppLayout {

    public TooltipPositioning() {
        DrawerToggle toggle = new DrawerToggle();
        Tabs tabs = getTabs();

        addToDrawer(tabs);
        addToNavbar(toggle);

        getElement().getThemeList().add("narrow-drawer");
    }

    private Tabs getTabs() {
        Tabs tabs = new Tabs();
        tabs.add(
            createTab(VaadinIcon.HOME, "Home"),
            createTab(VaadinIcon.CALENDAR, "Calendar"),
            createTab(VaadinIcon.CHART, "Reports")
        );
        tabs.setOrientation(Tabs.Orientation.VERTICAL);
        return tabs;
    }

    private Tab createTab(VaadinIcon viewIcon, String viewName) {
        Icon icon = viewIcon.create();

        RouterLink link = new RouterLink();
        link.add(icon);
        // Demo has no routes
        // link.setRoute(viewClass.java);
        link.setTabIndex(-1);

        // tag::snippet[]
        Tab tab = new Tab(link);
        // tab.setTooltipText(viewName).withPosition(TooltipPosition.END);
        // end::snippet[]

        return tab;
    }

    public static class Exporter extends DemoExporter<TooltipPositioning> {} // hidden-source-line
}
