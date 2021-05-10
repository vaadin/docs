package com.vaadin.demo.component.select;

import com.vaadin.demo.DemoExporter;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.select.Select;
import com.vaadin.flow.router.Route;

@Route("select-disabled")
public class SelectDisabled extends Div {

  public SelectDisabled() {
    // tag::snippet[]
    Select<String> select = new Select<>();
    select.setLabel("Size");
    select.setItems("XS (out of stock)", "S", "M", "L", "XL");
    select.setItemEnabledProvider(item -> !"XS (out of stock)".equals(item));
    select.setValue("XL");

    add(select);
    // end::snippet[]
  }

  public static class Exporter extends DemoExporter<SelectDisabled> { // hidden-source-line
  } // hidden-source-line
}
