package com.vaadin.demo.component.tabs;

import com.vaadin.demo.DemoExporter;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.tabs.Tab;
import com.vaadin.flow.component.tabs.Tabs;
import com.vaadin.flow.router.Route;

@Route("tabs-focus-ring")
public class TabsFocusRing extends Div {

  public TabsFocusRing() {
    // tag::snippet[]
    Tab details = new Tab("Details");
    details.getElement().setAttribute("focus-ring", "");
    Tab payment = new Tab("Payment");
    Tab shipping = new Tab("Shipping");
    Tabs tabs = new Tabs(details, payment, shipping);

    add(tabs);
    // end::snippet[]
  }

  public static class Exporter extends DemoExporter<TabsFocusRing> { // hidden-full-source-line
  } // hidden-full-source-line
}
