package com.vaadin.demo.component.applayout;

import com.vaadin.demo.DemoExporter;
import com.vaadin.flow.component.applayout.AppLayout;
import com.vaadin.flow.component.html.H1;
import com.vaadin.flow.component.tabs.Tab;
import com.vaadin.flow.component.tabs.Tabs;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.router.RouterLink;

@Route("app-layout-navbar")
// tag::snippet[]
public class AppLayoutNavbar extends AppLayout {

  public AppLayoutNavbar() {
    H1 title = new H1("MyApp");
    title.getStyle()
      .set("font-size", "var(--lumo-font-size-l)")
      .set("left", "var(--lumo-space-l)")
      .set("margin", "0")
      .set("position", "absolute");

    Tabs tabs = getTabs();

    addToNavbar(title, tabs);
  }
  // end::snippet[]

  private Tabs getTabs() {
    Tabs tabs = new Tabs();
    tabs.getStyle().set("margin", "auto");
    tabs.add(
      createTab("Dashboard"),
      createTab("Orders"),
      createTab("Customers"),
      createTab("Products")
    );
    return tabs;
  }

  private Tab createTab(String viewName) {
    RouterLink link = new RouterLink();
    link.add(viewName);
    // Demo has no routes
    // link.setRoute(viewClass.java);
    link.setTabIndex(-1);

    return new Tab(link);
  }
  public static class Exporter extends DemoExporter<AppLayoutNavbar> {} // hidden-source-line
  // tag::snippet[]
}
// end::snippet[]
