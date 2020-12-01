package com.vaadin.demo.component.tabs;

import com.vaadin.demo.DemoExporter;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.tabs.Tab;
import com.vaadin.flow.component.tabs.Tabs;
import com.vaadin.flow.router.Route;

@Route("tabs-states")
public class TabsStates extends Div {

  public TabsStates() {
    // tag::snippet[]
    Tab selected = new Tab("Selected");
    Tab unselected = new Tab("Unselected");

    Tab disabled = new Tab("Disabled");
    disabled.setEnabled(false);

    Tabs tabs = new Tabs(selected, unselected, disabled);

    add(tabs);
    // end::snippet[]
  }

  public static class Exporter extends DemoExporter<TabsStates> { // hidden-full-source-line
  } // hidden-full-source-line
}
