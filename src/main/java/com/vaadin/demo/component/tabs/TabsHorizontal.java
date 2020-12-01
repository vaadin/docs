package com.vaadin.demo.component.tabs;

import com.vaadin.demo.DemoExporter;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.tabs.Tab;
import com.vaadin.flow.component.tabs.Tabs;
import com.vaadin.flow.router.Route;

@Route("tabs-horizontal")
public class TabsHorizontal extends Div {

  public TabsHorizontal() {
    // tag::snippet[]
    Tab dashboard = new Tab("Dashboard");
    Tab orders = new Tab("Orders");
    Tab customers = new Tab("Customers");
    Tab products = new Tab("Products");
    Tab analytics = new Tab("Analytics");

    Tabs tabs = new Tabs(dashboard, orders, customers, products, analytics);
    tabs.setWidth("calc(var(--lumo-size-l) * 9)");

    add(tabs);
    // end::snippet[]
  }

  public static class Exporter extends DemoExporter<TabsHorizontal> { // hidden-full-source-line
  } // hidden-full-source-line
}
