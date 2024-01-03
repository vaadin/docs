package com.vaadin.demo.component.applayout;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.applayout.AppLayout;
import com.vaadin.flow.component.applayout.DrawerToggle;
import com.vaadin.flow.component.html.H1;
import com.vaadin.flow.component.html.H2;
import com.vaadin.flow.component.icon.VaadinIcon;
import com.vaadin.flow.component.orderedlayout.FlexComponent;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.Scroller;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.sidenav.SideNav;
import com.vaadin.flow.component.sidenav.SideNavItem;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.router.RouterLink;
import com.vaadin.flow.theme.lumo.LumoUtility;

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

        Scroller scroller = new Scroller(views);
        scroller.setClassName(LumoUtility.Padding.SMALL);

        DrawerToggle toggle = new DrawerToggle();

        H2 viewTitle = new H2("Orders");
        viewTitle.getStyle().set("font-size", "var(--lumo-font-size-l)")
                .set("margin", "0");

        HorizontalLayout subViews = getSecondaryNavigation();
        subViews.getElement()
                        .executeJs("window.patchAppLayoutNavigation(this);"); // hidden-source-line

        HorizontalLayout wrapper = new HorizontalLayout(toggle, viewTitle);
        wrapper.setAlignItems(FlexComponent.Alignment.CENTER);
        wrapper.setSpacing(false);

        VerticalLayout viewHeader = new VerticalLayout(wrapper, subViews);
        viewHeader.setPadding(false);
        viewHeader.setSpacing(false);

        addToDrawer(appTitle, scroller);
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

    private HorizontalLayout getSecondaryNavigation() {
            HorizontalLayout navigation = new HorizontalLayout();
            navigation.addClassNames(LumoUtility.JustifyContent.CENTER,
                            LumoUtility.Gap.SMALL, LumoUtility.Height.MEDIUM);
            navigation.add(createLink("All"), createLink("Open"),
                            createLink("Completed"), createLink("Cancelled"));
            return navigation;
    }

    private RouterLink createLink(String viewName) {
            RouterLink link = new RouterLink();
            link.add(viewName);
            // Demo has no routes
            // link.setRoute(viewClass.java);

            link.addClassNames(LumoUtility.Display.FLEX,
                            LumoUtility.AlignItems.CENTER,
                            LumoUtility.Padding.Horizontal.MEDIUM,
                            LumoUtility.TextColor.SECONDARY,
                            LumoUtility.FontWeight.MEDIUM);
            link.getStyle().set("text-decoration", "none");
            // hidden-source-line: workaround to make text color work
            link.getElement().setAttribute("href", viewName); // hidden-source-line

            return link;
    }

    public static class Exporter extends // hidden-source-line
            DemoExporter<AppLayoutSecondaryNavigation> { // hidden-source-line
    } // hidden-source-line
      // tag::snippet[]
}
// end::snippet[]
