package com.vaadin.demo.component.select;

import java.util.ArrayList;
import java.util.List;

import com.vaadin.demo.DemoExporter; // hidden-full-source-line
import com.vaadin.demo.domain.Ordering;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.select.Select;
import com.vaadin.flow.router.Route;

@Route("select-basic")
public class SelectBasic extends Div {

    public SelectBasic() {
        // tag::snippet[]
        // Have some data
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

        // Select needs to know how to get the item
        // label from the object type
        select.setItemLabelGenerator(Ordering::getName);

        add(select);
        // end::snippet[]
    }

    public static class Exporter extends DemoExporter<SelectBasic> { // hidden-full-source-line
    } // hidden-full-source-line
}
