package com.vaadin.demo.component.tooltip;

import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.H2;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("tooltip-html-element")
public class TooltipHtmlElement extends Div {

  public TooltipHtmlElement() {
    // tag::snippet[]
    H2 heading = new H2("Heading with tooltip");
    // Tooltip tooltip = new Tooltip.forComponent(heading).withText("This is a tooltip");
    add(heading);
    // end::snippet[]
  }

  public static class Exporter extends DemoExporter<TooltipHtmlElement> { // hidden-source-line
  } // hidden-source-line
}
