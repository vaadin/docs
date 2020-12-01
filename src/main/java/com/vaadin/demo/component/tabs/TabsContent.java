package com.vaadin.demo.component.tabs;

import com.vaadin.demo.DemoExporter;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.tabs.Tab;
import com.vaadin.flow.component.tabs.Tabs;
import com.vaadin.flow.router.Route;

@Route("tabs-content")
public class TabsContent extends Div {

  public TabsContent() {
    // tag::snippet[]
    Tab dashboard = new Tab("Dashboard");
    Tab payment = new Tab("Payment");
    Tab shipping = new Tab("Shipping");
    Tabs tabs = new Tabs(dashboard, payment, shipping);

    Div content = new Div();
    content.setText("This is Dashboard page");

    tabs.addSelectedChangeListener(e ->
            content.setText("This is " + e.getSelectedTab().getElement().getText() + " page"));

    // TODO(yuriy): fix content styles

    add(tabs, content);
    // end::snippet[]
  }

  public static class Exporter extends DemoExporter<TabsContent> { // hidden-full-source-line
  } // hidden-full-source-line
}
