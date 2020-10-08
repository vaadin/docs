package com.vaadin.demo.component.select;

import com.vaadin.demo.DemoExporter; // hidden-full-source-line
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Hr;
import com.vaadin.flow.component.select.Select;
import com.vaadin.flow.router.Route;

@Route("select-placeholder")
public class SelectPlaceholder extends Div {

  public SelectPlaceholder() {
    // tag::snippet[]
    Select<String> select = new Select<>();
    select.setLabel("Sort By");
    select.setPlaceholder("Select Criterion");
    select.setItems("Most recent first",
    		"Rating: high to low",
    		"Rating: low to high",
    		"Price: high to low",
    		"Price: low to high");

    add(select);
    // end::snippet[]
  }

  public static class SelectPlaceholderExporter extends DemoExporter<SelectPlaceholder> { // hidden-full-source-line
  } // hidden-full-source-line
}
