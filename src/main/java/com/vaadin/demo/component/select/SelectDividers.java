package com.vaadin.demo.component.select;

import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Hr;
import com.vaadin.flow.component.select.Select;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-full-source-line

@Route("select-dividers")
public class SelectDividers extends Div {

  public SelectDividers() {
    // tag::snippet[]
    Select<String> select = new Select<>();
    select.setLabel("Sort by");
    select.setItems("Most recent first", "Rating: high to low",
      "Rating: low to high", "Price: high to low", "Price: low to high");
    select.addComponents("Most recent first", new Hr());
    select.addComponents("Rating: low to high", new Hr());
    select.setValue("Most recent first");

    add(select);
    // end::snippet[]
  }

  public static class Exporter extends DemoExporter<SelectDividers> { // hidden-full-source-line
  } // hidden-full-source-line
}
