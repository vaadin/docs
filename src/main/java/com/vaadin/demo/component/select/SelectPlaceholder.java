package com.vaadin.demo.component.select;

import com.vaadin.demo.DemoExporter;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.select.Select;
import com.vaadin.flow.router.Route;

@Route("select-placeholder")
public class SelectPlaceholder extends Div {

  public SelectPlaceholder() {
    // tag::snippet[]
    Select<String> select = new Select<>();
    select.setLabel("Size");
    select.setItems("XS", "S", "M", "L", "XL");
    select.setPlaceholder("Select size");

    add(select);
    // end::snippet[]
  }

  public static class Exporter extends DemoExporter<SelectPlaceholder> { // hidden-source-line
  } // hidden-source-line
}
