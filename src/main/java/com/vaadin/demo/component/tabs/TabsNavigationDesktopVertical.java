package com.vaadin.demo.component.tabs;

import com.vaadin.demo.DemoExporter;
import com.vaadin.flow.component.applayout.AppLayout;
import com.vaadin.flow.component.applayout.DrawerToggle;
import com.vaadin.flow.component.html.Anchor;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.H3;
import com.vaadin.flow.component.tabs.Tab;
import com.vaadin.flow.component.tabs.Tabs;
import com.vaadin.flow.router.Route;

@Route("tabs-navigation-desktop-vertical")
public class TabsNavigationDesktopVertical extends AppLayout {

  public TabsNavigationDesktopVertical() {
    // tag::snippet[]
    Tab dashboards = new Tab(new Anchor("","Dashboards"));
    Tab orders = new Tab(new Anchor("", "Orders"));
    Tab customers = new Tab(new Anchor("", "Customers"));
    Tab products = new Tab(new Anchor("", "Products"));
    Tab documents = new Tab(new Anchor("", "Documents"));
    Tab tasks = new Tab(new Anchor("", "Tasks"));
    Tab analytics = new Tab(new Anchor("", "Analytics"));

    Tabs tabs = new Tabs(dashboards, orders, customers, products, documents, tasks, analytics);
    tabs.setOrientation(Tabs.Orientation.VERTICAL);
    tabs.getStyle().set("margin", "0 auto");
    tabs.getStyle().set("flex", "1");

    addToNavbar(new DrawerToggle(), new H3("MyApp"));
    addToNavbar(tabs);

    setDrawerOpened(true);

    // TODO(yuriy): fix anchors, fix overlay opened, fix display problems

    // end::snippet[]
  }

  public static class Exporter extends DemoExporter<TabsNavigationDesktopVertical> { // hidden-full-source-line
  } // hidden-full-source-line
}
