package com.vaadin.demo.component.scroller;

import com.vaadin.demo.DemoExporter;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Image;
import com.vaadin.flow.component.orderedlayout.Scroller;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.server.StreamResource;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.UncheckedIOException;

@Route("scroller-both")
public class ScrollerBoth extends Div {

  public ScrollerBoth() {
    // tag::snippet[]
    Scroller scroller = new Scroller();
    scroller.setWidthFull();
    scroller.setHeight("300px");

    StreamResource imageResource = new StreamResource("scroller-both-img+.png",
            () -> getFileStream("src/main/resources/images/scroller-both-img.png"));

    Image img = new Image(imageResource, "Application");
    scroller.setContent(img);

    add(scroller);

    // end::snippet[]
  }

  // tag::filestream[]
    private InputStream getFileStream(String filePath) {
      try {
        return new FileInputStream(filePath);
      } catch (IOException error) {
        throw new UncheckedIOException(error);
      }
    }
  // end::filestream[]

  public static class Exporter extends DemoExporter<ScrollerBoth> { // hidden-full-source-line
  } // hidden-full-source-line
}
