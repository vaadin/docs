package com.vaadin.demo.component.horizontallayout;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.router.Route;

@Route("horizontal-layout-basic")
public class HorizontalLayoutBasic extends Div {
    public HorizontalLayoutBasic() {
        // tag::snippet[]
        HorizontalLayout layout = new HorizontalLayout();
        layout.setPadding(true);

        Div item1 = new Div("Item 1");
        item1.setClassName("example-item");

        Div item2 = new Div("Item 2");
        item2.setClassName("example-item");

        Div item3 = new Div("Item 3");
        item3.setClassName("example-item");

        layout.add(item1, item2, item3);
        // end::snippet[]

        this.setClassName("basic-layouts-example");
        this.add(layout);
    }

    public static class Exporter extends // hidden-source-line
            DemoExporter<HorizontalLayoutBasic> { // hidden-source-line
    } // hidden-source-line
}
