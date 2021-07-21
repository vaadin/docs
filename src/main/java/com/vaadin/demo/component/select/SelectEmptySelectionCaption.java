package com.vaadin.demo.component.select;

import com.vaadin.demo.DemoExporter;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.select.Select;
import com.vaadin.flow.router.Route;

@Route("select-empty-selection-caption")
public class SelectEmptySelectionCaption extends Div {

  public SelectEmptySelectionCaption() {
    Select<String> select = new Select<>();
    select.setEmptySelectionAllowed(true);
    // tag::snippet[]
    select.setEmptySelectionCaption("Random size");
    // end::snippet[]
    select.setLabel("Size");
    select.setItems("XS", "S", "M", "L", "XL");

    add(select);
  }

  public static class Exporter extends DemoExporter<SelectEmptySelectionCaption> { // hidden-source-line
  } // hidden-source-line
}
