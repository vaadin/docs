package com.vaadin.demo.component.select;

import java.util.ArrayList;
import java.util.List;

import com.vaadin.demo.DemoExporter; // hidden-full-source-line
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Hr;
import com.vaadin.flow.component.select.Select;
import com.vaadin.flow.router.Route;

@Route("select-separators")
public class SelectSeparators extends Div {

  public SelectSeparators() {
    class Ordering {
        private int id;
        private String name;
        public Ordering(int id, String name) {
            this.id = id;
            this.name = name;
        }
        public int getId() {
            return id;
        }
        public String getName() {
            return name;
        }
    }

    // tag::snippet[]
    List<Ordering> orderings = new ArrayList<Ordering>();
    orderings.add(new Ordering(0, "Most recent first"));
    orderings.add(new Ordering(1, "Rating: high to low"));
    orderings.add(new Ordering(2, "Rating: low to high"));
    orderings.add(new Ordering(3, "Price: high to low"));
    orderings.add(new Ordering(4, "Price: low to high"));

    // Create a Select component with the data
    Select<Ordering> select = new Select<>();
    select.setLabel("Sort By");
    select.setItems(orderings);
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
