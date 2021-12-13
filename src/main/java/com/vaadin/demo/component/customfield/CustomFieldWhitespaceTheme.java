package com.vaadin.demo.component.customfield;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.html.Div;


public class CustomFieldWhitespaceTheme extends Div{

  public CustomFieldWhitespaceTheme() {
    // tag::snippet[]
    CoordinateField coordinate = new CoordinateField();

    coordinate.getElement().getThemeList().add("whitespace");

    add(coordinate);
    // end::snippet[]
  }
  public static class Exporter extends DemoExporter<CustomFieldWhitespaceTheme> {} // hidden-source-line
}
