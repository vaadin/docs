package com.vaadin.demo.component.select;

import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.select.Select;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("select-no-vertical-overlap")
public class SelectNoVerticalOverlap extends Div {

    public SelectNoVerticalOverlap() {
        // tag::snippet[]
        Select<String> select = new Select<>();
        select.setNoVerticalOverlap(true);
        // end::snippet[]
        select.setLabel("Sort by");
        select.setItems("Most recent first", "Rating: high to low",
                "Rating: low to high", "Price: high to low",
                "Price: low to high");

        add(select);
    }

    public static class Exporter extends DemoExporter<SelectNoVerticalOverlap> { // hidden-source-line
    } // hidden-source-line
}
