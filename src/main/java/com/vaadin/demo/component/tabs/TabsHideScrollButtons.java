package com.vaadin.demo.component.tabs;

import com.vaadin.demo.DemoExporter;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.tabs.Tab;
import com.vaadin.flow.component.tabs.Tabs;
import com.vaadin.flow.component.tabs.TabsVariant;
import com.vaadin.flow.router.Route;

@Route("tabs-hide-scroll-buttons")
public class TabsHideScrollButtons extends Div {

  public TabsHideScrollButtons() {
    // tag::snippet[]
    Tab dashboard = new Tab("Dashboard");
    Tab orders = new Tab("Orders");
    Tab customers = new Tab("Customers");
    Tab products = new Tab("Products");
    Tab documents = new Tab("Documents");
    Tab tasks = new Tab("Tasks");
    Tab analytics = new Tab("Analytics");

    Tabs tabs = new Tabs(dashboard, orders, customers, products, documents, tasks, analytics);

    tabs.addThemeVariants(TabsVariant.LUMO_HIDE_SCROLL_BUTTONS);

    add(tabs);
    // end::snippet[]
  }

  public static class Exporter extends DemoExporter<TabsHideScrollButtons> { // hidden-full-source-line
  } // hidden-full-source-line
}
