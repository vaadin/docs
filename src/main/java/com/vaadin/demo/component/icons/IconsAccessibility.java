package com.vaadin.demo.component.icons;

import com.vaadin.demo.flow.routing.Route;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.icon.VaadinIcon;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("icons-accessibility")
public class IconsAccessibility extends Div {

  public IconsAccessibility() {
    // tag::snippet[]
    Button closeButton = new Button(VaadinIcon.CLOSE.create());
    closeButton.setAriaLabel("Close dialog");
    // end::snippet[]

    add(closeButton);
  }

  public static class Exporter extends DemoExporter<IconsAccessibility> { // hidden-source-line
  }
}
