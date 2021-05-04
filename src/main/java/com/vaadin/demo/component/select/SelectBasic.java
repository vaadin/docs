package com.vaadin.demo.component.select;

import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.select.Select;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("select-basic")
public class SelectBasic extends Div {

  public SelectBasic() {
    // tag::snippet[]
    Select<String> select = new Select<>();
    select.setLabel("Sort by");
    select.setItems("Most recent first", "Rating: high to low",
      "Rating: low to high", "Price: high to low", "Price: low to high");
    select.setValue("Most recent first");

    add(select);
    // end::snippet[]
  }

  public static class Exporter extends DemoExporter<SelectBasic> { // hidden-source-line
  } // hidden-source-line
}
