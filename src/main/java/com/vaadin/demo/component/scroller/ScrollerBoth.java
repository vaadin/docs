package com.vaadin.demo.component.scroller;

import com.vaadin.demo.DemoExporter;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Image;
import com.vaadin.flow.component.orderedlayout.Scroller;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.server.StreamResource;

@Route("scroller-both")
public class ScrollerBoth extends Div {

  public ScrollerBoth() {
    // tag::snippet[]
    Scroller scroller = new Scroller();
    scroller.setWidthFull();
    scroller.setHeight("300px");

    StreamResource imageResource = new StreamResource("reindeer+.jpg",
            () -> getClass().getResourceAsStream("/images/reindeer.jpg"));

    Image img = new Image(imageResource, "A reindeer walking on a snowy lake shore at dusk");
    scroller.setContent(img);

    add(scroller);
    // end::snippet[]
  }

  public static class Exporter extends DemoExporter<ScrollerBoth> { // hidden-source-line
  } // hidden-source-line
}
