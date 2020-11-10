package com.vaadin.demo.component.select;

import java.util.ArrayList;
import java.util.List;

import com.vaadin.demo.DemoExporter; // hidden-full-source-line
import com.vaadin.demo.domain.Ordering;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Hr;
import com.vaadin.flow.component.select.Select;
import com.vaadin.flow.router.Route;

@Route("select-separators")
public class SelectSeparators extends Div {

  public SelectSeparators() {
    // tag::snippet[]
    List<Ordering> orderings = new ArrayList<Ordering>();
    orderings.add(new Ordering(0, "Most recent first"));
    orderings.add(new Ordering(1, "Rating: high to low"));
    orderings.add(new Ordering(2, "Rating: low to high"));
    orderings.add(new Ordering(3, "Price: high to low"));
    orderings.add(new Ordering(4, "Price: low to high"));

    // Create a Select component with the data
    Select<Ordering> select = new Select<>();
    select.setLabel("Sort by");
    select.setItems(orderings);
    select.setValue(orderings.get(0));
    select.setItemLabelGenerator(Ordering::getName);

    // Add horizontal rulers after specified items
    select.addComponents(orderings.get(0), new Hr());
    select.addComponents(orderings.get(2), new Hr());

    add(select);
    // end::snippet[]
  }

  public static class SelectSeparatorsExporter extends DemoExporter<SelectSeparators> { // hidden-full-source-line
  } // hidden-full-source-line
}
