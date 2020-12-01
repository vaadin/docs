package com.vaadin.demo.component.tabs;

import com.vaadin.demo.DemoExporter;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.tabs.Tab;
import com.vaadin.flow.component.tabs.Tabs;
import com.vaadin.flow.router.Route;

@Route("tabs-vertical")
public class TabsVertical extends Div {

  public TabsVertical() {
    // tag::snippet[]
    Tab dashboard = new Tab("Dashboard");
    Tab orders = new Tab("Orders");
    Tab customers = new Tab("Customers");
    Tab products = new Tab("Products");
    Tab documents = new Tab("Documents");
    Tab tasks = new Tab("Tasks");
    Tab analytics = new Tab("Analytics");

    Tabs tabs = new Tabs(dashboard, orders, customers, products, documents, tasks, analytics);
    tabs.setOrientation(Tabs.Orientation.VERTICAL);

    tabs.setWidth("calc(var(--lumo-size-l) * 5)");
    tabs.setHeight("calc(var(--lumo-size-l) * 5)");

    add(tabs);
    // end::snippet[]
  }

  public static class Exporter extends DemoExporter<TabsVertical> { // hidden-full-source-line
  } // hidden-full-source-line
}
