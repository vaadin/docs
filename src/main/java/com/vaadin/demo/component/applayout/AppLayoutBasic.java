package com.vaadin.demo.component.applayout;

import com.vaadin.flow.component.applayout.AppLayout;
import com.vaadin.flow.component.applayout.DrawerToggle;
import com.vaadin.flow.component.html.H1;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.icon.Icon;
import com.vaadin.flow.component.icon.VaadinIcon;
import com.vaadin.flow.component.tabs.Tab;
import com.vaadin.flow.component.tabs.Tabs;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.router.RouterLink;

@Route("app-layout-basic")
public class AppLayoutBasic extends AppLayout {

  public AppLayoutBasic() {
    // tag::snippet[]
    DrawerToggle toggle = new DrawerToggle();

    H1 title = new H1("MyApp");
    title.getStyle()
      .set("font-size", "var(--lumo-font-size-l)")
      .set("margin", "0");

    Tabs tabs = new Tabs();
    tabs.add(
      createTab(VaadinIcon.DASHBOARD, "Dashboard"),
      createTab(VaadinIcon.CART, "Orders"),
      createTab(VaadinIcon.USER_HEART, "Customers"),
      createTab(VaadinIcon.PACKAGE, "Products"),
      createTab(VaadinIcon.RECORDS, "Documents"),
      createTab(VaadinIcon.LIST, "Tasks"),
      createTab(VaadinIcon.CHART, "Analytics")
    );
    tabs.setOrientation(Tabs.Orientation.VERTICAL);

    addToDrawer(tabs);
    addToNavbar(toggle, title);
    // end::snippet[]
  }

  private Tab createTab(VaadinIcon viewIcon, String viewName) {
    Icon icon = viewIcon.create();
    icon.getStyle()
            .set("box-sizing", "border-box")
            .set("margin-inline-end", "var(--lumo-space-m)")
            .set("margin-inline-start", "var(--lumo-space-xs)")
            .set("padding", "var(--lumo-space-xs)");

    RouterLink link = new RouterLink();
    link.add(icon, new Span(viewName));
    // Demo has no routes
    // link.setRoute(viewClass.java);
    link.setTabIndex(-1);

    return new Tab(link);
  }
  public static class Exporter extends DemoExporter<AppLayoutBasic> {} // hidden-source-line
}
