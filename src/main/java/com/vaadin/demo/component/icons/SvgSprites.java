package com.vaadin.demo.component.icons;

import com.vaadin.demo.flow.routing.Route;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Paragraph;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("svg-sprites")
public class SvgSprites extends Div {

  public SvgSprites() {
    add(new Paragraph("placeholder"));
  }

  public static class Exporter extends DemoExporter<SvgSprites> { // hidden-source-line
  }
}
