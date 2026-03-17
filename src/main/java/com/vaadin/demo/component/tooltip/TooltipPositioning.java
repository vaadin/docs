package com.vaadin.demo.component.tooltip;

import com.vaadin.flow.component.applayout.AppLayout;
import com.vaadin.flow.component.applayout.DrawerToggle;
import com.vaadin.flow.component.icon.VaadinIcon;
import com.vaadin.flow.component.shared.Tooltip.TooltipPosition;
import com.vaadin.flow.component.sidenav.SideNav;
import com.vaadin.flow.component.sidenav.SideNavItem;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("tooltip-positioning")
public class TooltipPositioning extends AppLayout {

    public TooltipPositioning() {
        DrawerToggle toggle = new DrawerToggle();

        SideNav nav = getSideNav();
        nav.getElement().executeJs("window.patchSideNavNavigation(this);"); // hidden-source-line
        nav.getStyle().set("margin", "0 var(--vaadin-gap-xs)")
                .set("--vaadin-icon-size", "1.5rem");

        addToDrawer(nav);
        addToNavbar(toggle);

        getElement().getThemeList().add("narrow-drawer");
    }

    private SideNav getSideNav() {
        SideNav sideNav = new SideNav();
        sideNav.addItem(
                createItem(VaadinIcon.DASHBOARD, "Dashboard", "/dashboard"),
                createItem(VaadinIcon.CART, "Orders", "/orders"),
                createItem(VaadinIcon.USER_HEART, "Customers", "/customers"));
        return sideNav;
    }

    private SideNavItem createItem(VaadinIcon viewIcon, String viewName,
            String path) {
        // tag::snippet[]
        SideNavItem item = new SideNavItem(viewName, path, viewIcon.create());
        item.setTooltipText(viewName).withPosition(TooltipPosition.END);
        // end::snippet[]
        return item;
    }

    public static class Exporter extends DemoExporter<TooltipPositioning> { // hidden-source-line
    } // hidden-source-line
}
