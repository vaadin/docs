package com.vaadin.demo.component.select;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.select.Select;
import com.vaadin.flow.router.Route;

@Route("select-empty-selection")
public class SelectEmptySelection extends Div {

  public SelectEmptySelection() {
    Select<String> select = new Select<>();
    // tag::snippet[]
    select.setEmptySelectionAllowed(true);
    // end::snippet[]
    select.setLabel("Size");
    select.setItems("XS", "S", "M", "L", "XL");
    select.setPlaceholder("Select size");

    add(select);
  }

  public static class Exporter extends DemoExporter<SelectEmptySelection> { // hidden-source-line
  } // hidden-source-line
}
