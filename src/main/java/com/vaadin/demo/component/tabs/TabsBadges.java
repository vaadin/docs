package com.vaadin.demo.component.tabs;

import com.vaadin.demo.DemoExporter;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.tabs.Tab;
import com.vaadin.flow.component.tabs.Tabs;
import com.vaadin.flow.router.Route;

@Route("tabs-badges")
public class TabsBadges extends Div {

  public TabsBadges() {
    // tag::snippet[]
    Tab open = new Tab(new Span("Open"), new Span("24"));
    Tab completed = new Tab(new Span("Completed"), new Span("439"));
    Tab cancelled = new Tab(new Span("Cancelled"), new Span("5"));
    Tabs tabs = new Tabs(open, completed, cancelled);

    // TODO(yuriy): fix badges styles

    add(tabs);
    // end::snippet[]
  }

  public static class Exporter extends DemoExporter<TabsBadges> { // hidden-full-source-line
  } // hidden-full-source-line
}
