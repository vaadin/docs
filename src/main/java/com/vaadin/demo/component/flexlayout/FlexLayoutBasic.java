package com.vaadin.demo.component.flexlayout;

import com.vaadin.demo.DemoExporter;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.orderedlayout.FlexLayout;
import com.vaadin.flow.component.splitlayout.SplitLayout;
import com.vaadin.flow.router.Route;

@Route("flex-layout-basic")
public class FlexLayoutBasic extends Div {

    public FlexLayoutBasic() {
        // tag::snippet[]
        FlexLayout layout = new FlexLayout();

        Div item1 = new Div("Item 1");
        item1.setClassName("example-item");

        Div item2 = new Div("Item 2");
        item2.setClassName("example-item");

        Div item3 = new Div("Item 3");
        item3.setClassName("example-item");

        Div item4 = new Div("Item 4");
        item4.setClassName("example-item");

        Div item5 = new Div("Item 5");
        item5.setClassName("example-item");

        Div item6 = new Div("Item 6");
        item6.setClassName("example-item");

        layout.add(item1, item2, item3, item4, item5, item6);
        // end::snippet[]

        layout.setWidthFull();
        layout.getStyle().setGap("5px").setPadding("5px");

        SplitLayout splitLayout = new SplitLayout(layout, new Div());
        add(splitLayout);

        layout.addClassNames("flex-layout");

        this.addClassNames("basic-layouts-example");
    }

    public static class Exporter extends // hidden-source-line
            DemoExporter<FlexLayoutBasic> { // hidden-source-line
    } // hidden-source-line
}
