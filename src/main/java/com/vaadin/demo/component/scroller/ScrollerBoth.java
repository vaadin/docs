package com.vaadin.demo.component.scroller;

import com.vaadin.demo.DemoExporter;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Image;
import com.vaadin.flow.component.orderedlayout.Scroller;
import com.vaadin.flow.router.Route;

@Route("scroller-both")
public class ScrollerBoth extends Div {

  public ScrollerBoth() {
    // tag::snippet[]
    Scroller scroller = new Scroller();
    scroller.setWidth("300px");
    scroller.setHeight("300px");
    scroller.getStyle().set("padding", "var(--lumo-space-m)");

    Image img = new Image("https://cdn2.hubspot.net/hubfs/1840687/Pages/index/taskmob-laptop-mockup.png", "Application");
    scroller.setContent(img);

    add(scroller);
    // end::snippet[]
  }

  public static class Exporter extends DemoExporter<ScrollerBoth> { // hidden-full-source-line
  } // hidden-full-source-line
}
