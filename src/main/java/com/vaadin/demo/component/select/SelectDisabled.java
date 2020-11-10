package com.vaadin.demo.component.select;

import java.util.ArrayList;
import java.util.List;

import com.vaadin.demo.DemoExporter; // hidden-full-source-line
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.select.Select;
import com.vaadin.flow.router.Route;

@Route("select-disabled")
public class SelectDisabled extends Div {

    public SelectDisabled() {
        class SizeInStock {
            private String label;
            private int count;

            public SizeInStock(String label, int count) {
                this.label = label;
                this.count = count;
            }

            public String getLabel() {
                return label;
            }

            public String getLabelWithNotes() {
                return (count > 0) ? label : label + " (out of stock)";
            }

            public int getCount() {
                return count;
            }
        }

        List<SizeInStock> sizes = new ArrayList<SizeInStock>();
        sizes.add(new SizeInStock("XS", 0));
        sizes.add(new SizeInStock("S", 10));
        sizes.add(new SizeInStock("M", 10));
        sizes.add(new SizeInStock("L", 10));
        sizes.add(new SizeInStock("XL", 10));

        // tag::snippet[]
        Select<SizeInStock> select = new Select<>();
        select.setLabel("Size");
        select.setItems(sizes);
        select.setValue(sizes.get(4)); // XL
        select.setItemLabelGenerator(SizeInStock::getLabelWithNotes);

        // Disable items out of stock
        select.setItemEnabledProvider(item -> item.getCount() > 0);

        add(select);
        // end::snippet[]
    }

    public static class SelectDisabledExporter extends DemoExporter<SelectDisabled> { // hidden-full-source-line
    } // hidden-full-source-line
}
