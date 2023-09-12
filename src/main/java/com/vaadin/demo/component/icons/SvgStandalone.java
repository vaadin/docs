package com.vaadin.demo.component.icons;

import com.vaadin.demo.flow.routing.Route;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Paragraph;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("svg-standalone")
public class SvgStandalone extends Div {

  public SvgStandalone() {
    add(new Paragraph("placeholder"));
  }

  public static class Exporter extends DemoExporter<SvgStandalone> { // hidden-source-line
  }
}
