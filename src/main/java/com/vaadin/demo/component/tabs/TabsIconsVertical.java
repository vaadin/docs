package com.vaadin.demo.component.tabs;

import com.vaadin.demo.DemoExporter;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.icon.Icon;
import com.vaadin.flow.component.icon.VaadinIcon;
import com.vaadin.flow.component.tabs.Tab;
import com.vaadin.flow.component.tabs.Tabs;
import com.vaadin.flow.component.tabs.TabsVariant;
import com.vaadin.flow.router.Route;

@Route("tabs-icons-vertical")
public class TabsIconsVertical extends Div {

  public TabsIconsVertical() {
    // tag::snippet[]
    Tab tab1 = new Tab(new Icon(VaadinIcon.USER), new Span("Tab one"));
    Tab tab2 = new Tab(new Icon(VaadinIcon.COG), new Span("Tab two"));
    Tab tab3 = new Tab(new Icon(VaadinIcon.BELL), new Span("Tab three"));

    Tabs tabs = new Tabs(tab1, tab2, tab3);
    tabs.setOrientation(Tabs.Orientation.VERTICAL);

    add(tabs);
    // end::snippet[]
  }

  public static class Exporter extends DemoExporter<TabsIconsVertical> { // hidden-full-source-line
  } // hidden-full-source-line
}
