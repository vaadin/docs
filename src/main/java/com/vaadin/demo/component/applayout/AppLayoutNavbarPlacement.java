package com.vaadin.demo.component.applayout;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.applayout.AppLayout;
import com.vaadin.flow.component.applayout.DrawerToggle;
import com.vaadin.flow.component.html.H1;
import com.vaadin.flow.component.icon.VaadinIcon;
import com.vaadin.flow.component.sidenav.SideNav;
import com.vaadin.flow.component.sidenav.SideNavItem;
import com.vaadin.flow.router.Route;

@Route("app-layout-navbar-placement")
// tag::snippet[]
public class AppLayoutNavbarPlacement extends AppLayout {

    public AppLayoutNavbarPlacement() {
        DrawerToggle toggle = new DrawerToggle();

        H1 title = new H1("MyApp");
        title.getStyle().set("font-size", "var(--lumo-font-size-l)")
                .set("margin", "0");

        SideNav nav = getSideNav();
        nav.getElement().executeJs("window.patchSideNavNavigation(this);"); // hidden-source-line

        addToDrawer(nav);
        addToNavbar(toggle, title);
    }
    // end::snippet[]

    private SideNav getSideNav() {
            SideNav nav = new SideNav();
            nav.addItem(new SideNavItem("Dashboard", "/dashboard",
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
            return nav;
    }

    public static class Exporter extends // hidden-source-line
            DemoExporter<AppLayoutNavbarPlacement> { // hidden-source-line
    } // hidden-source-line
      // tag::snippet[]
}
// end::snippet[]
