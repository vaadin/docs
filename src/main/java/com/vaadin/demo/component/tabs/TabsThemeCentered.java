package com.vaadin.demo.component.tabs;

import com.vaadin.demo.DemoExporter;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.tabs.Tab;
import com.vaadin.flow.component.tabs.Tabs;
import com.vaadin.flow.component.tabs.TabsVariant;
import com.vaadin.flow.router.Route;

@Route("tabs-theme-centered")
public class TabsThemeCentered extends Div {

  public TabsThemeCentered() {
    // tag::snippet[]
    Tab dashboard = new Tab("Dashboard");
    Tab orders = new Tab("Orders");
    Tab customers = new Tab("Customers");
    Tabs tabs = new Tabs(dashboard, orders, customers);

    tabs.addThemeVariants(TabsVariant.LUMO_CENTERED);

    add(tabs);
    // end::snippet[]
  }

  public static class Exporter extends DemoExporter<TabsThemeCentered> { // hidden-full-source-line
  } // hidden-full-source-line
}
