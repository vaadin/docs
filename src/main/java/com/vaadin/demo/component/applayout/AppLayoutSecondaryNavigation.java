package com.vaadin.demo.component.applayout;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.applayout.AppLayout;
import com.vaadin.flow.component.applayout.DrawerToggle;
import com.vaadin.flow.component.html.H1;
import com.vaadin.flow.component.html.H2;
import com.vaadin.flow.component.icon.VaadinIcon;
import com.vaadin.flow.component.orderedlayout.FlexComponent;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.sidenav.SideNav;
import com.vaadin.flow.component.sidenav.SideNavItem;
import com.vaadin.flow.component.tabs.Tab;
import com.vaadin.flow.component.tabs.Tabs;
import com.vaadin.flow.router.Route;

@Route("app-layout-secondary-navigation")
// tag::snippet[]
public class AppLayoutSecondaryNavigation extends AppLayout {

    public AppLayoutSecondaryNavigation() {
        H1 appTitle = new H1("MyApp");
        appTitle.getStyle().set("font-size", "var(--lumo-font-size-l)")
                .set("line-height", "var(--lumo-size-l)")
                .set("margin", "0 var(--lumo-space-m)");

        SideNav views = getPrimaryNavigation();
        views.getElement().executeJs("window.patchSideNavNavigation(this);"); // hidden-source-line

        DrawerToggle toggle = new DrawerToggle();

        H2 viewTitle = new H2("Orders");
        viewTitle.getStyle().set("font-size", "var(--lumo-font-size-l)")
                .set("margin", "0");

        Tabs subViews = getSecondaryNavigation();

        HorizontalLayout wrapper = new HorizontalLayout(toggle, viewTitle);
        wrapper.setAlignItems(FlexComponent.Alignment.CENTER);
        wrapper.setSpacing(false);

        VerticalLayout viewHeader = new VerticalLayout(wrapper, subViews);
        viewHeader.setPadding(false);
        viewHeader.setSpacing(false);

        addToDrawer(appTitle, views);
        addToNavbar(viewHeader);

        setPrimarySection(Section.DRAWER);
    }
    // end::snippet[]

    private SideNav getPrimaryNavigation() {
            SideNav sideNav = new SideNav();
            sideNav.addItem(new SideNavItem("Dashboard", "/dashboard",
                            VaadinIcon.DASHBOARD.create()),
                            new SideNavItem("Orders", "/orders",
                                            VaadinIcon.CART.create()),
                            new SideNavItem("Customers", "/customers",
                                            VaadinIcon.USER_HEART.create()),
                            new SideNavItem("Products", "/products",
                                            VaadinIcon.PACKAGE.create()),
                            new SideNavItem("Documents", "/documents",
                                            VaadinIcon.RECORDS.create()),
                            new SideNavItem("Tasks", "/tasks",
                                            VaadinIcon.LIST.create()),
                            new SideNavItem("Analytics", "/analytics",
                                            VaadinIcon.CHART.create()));
            return sideNav;
    }

    private Tabs getSecondaryNavigation() {
        Tabs tabs = new Tabs();
        tabs.add(new Tab("All"), new Tab("Open"), new Tab("Completed"),
                new Tab("Cancelled"));
        return tabs;
    }

    public static class Exporter extends // hidden-source-line
            DemoExporter<AppLayoutSecondaryNavigation> { // hidden-source-line
    } // hidden-source-line
      // tag::snippet[]
}
// end::snippet[]
