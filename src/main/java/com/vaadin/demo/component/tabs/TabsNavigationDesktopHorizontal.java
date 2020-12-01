package com.vaadin.demo.component.tabs;

import com.vaadin.demo.DemoExporter;
import com.vaadin.flow.component.applayout.AppLayout;
import com.vaadin.flow.component.html.Anchor;
import com.vaadin.flow.component.tabs.Tab;
import com.vaadin.flow.component.tabs.Tabs;
import com.vaadin.flow.router.Route;

@Route("tabs-navigation-desktop-horizontal")
public class TabsNavigationDesktopHorizontal extends AppLayout {

  public TabsNavigationDesktopHorizontal() {
    // tag::snippet[]
    Tab dashboards = new Tab(new Anchor("","Dashboards"));
    Tab orders = new Tab(new Anchor("", "Orders"));
    Tab customers = new Tab(new Anchor("", "Customers"));
    Tab products = new Tab(new Anchor("", "Products"));
    Tab documents = new Tab(new Anchor("", "Documents"));
    Tab tasks = new Tab(new Anchor("", "Tasks"));
    Tab analytics = new Tab(new Anchor("", "Analytics"));

    Tabs tabs = new Tabs(dashboards, orders, customers, products, documents, tasks, analytics);
    tabs.setMaxWidth("100%");
    addToDrawer(tabs);

    // TODO(yuriy): fix anchors, fix overlay opened, fix app name, fix display problems

    // end::snippet[]
  }

  public static class Exporter extends DemoExporter<TabsNavigationDesktopHorizontal> { // hidden-full-source-line
  } // hidden-full-source-line
}
