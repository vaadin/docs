package com.vaadin.demo.component.applayout;

import com.vaadin.demo.DemoExporter;
import com.vaadin.flow.component.applayout.AppLayout;
import com.vaadin.flow.component.applayout.DrawerToggle;
import com.vaadin.flow.component.html.H1;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.icon.Icon;
import com.vaadin.flow.component.icon.VaadinIcon;
import com.vaadin.flow.component.tabs.Tab;
import com.vaadin.flow.component.tabs.Tabs;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.router.RouterLink;

@Route("app-layout-drawer")
// tag::snippet[]
public class AppLayoutDrawer extends AppLayout {

  public AppLayoutDrawer() {
    DrawerToggle toggle = new DrawerToggle();

    H1 title = new H1("Dashboard");
    title.getStyle()
      .set("font-size", "var(--lumo-font-size-l)")
      .set("margin", "0");

    Tabs tabs = getTabs();

    addToDrawer(tabs);
    addToNavbar(toggle, title);

    setPrimarySection(Section.DRAWER);
  }
  // end::snippet[]

  private Tabs getTabs() {
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
    return tabs;
  }

  private Tab createTab(VaadinIcon viewIcon, String viewName) {
    Icon icon = viewIcon.create();
    icon.getStyle()
      .set("box-sizing", "border-box")
      .set("margin-inline-end", "var(--lumo-space-m)")
      .set("padding", "var(--lumo-space-xs)");

    RouterLink link = new RouterLink();
    link.add(icon, new Span(viewName));
    // Demo has no routes
    // link.setRoute(viewClass.java);
    link.setTabIndex(-1);

    return new Tab(link);
  }
  public static class Exporter extends DemoExporter<AppLayoutDrawer> {} // hidden-source-line
  // tag::snippet[]
}
// end::snippet[]
