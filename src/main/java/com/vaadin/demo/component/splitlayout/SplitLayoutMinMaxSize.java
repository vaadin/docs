package com.vaadin.demo.component.splitlayout;

import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.select.Select;
import com.vaadin.flow.component.splitlayout.SplitLayout;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("split-layout-min-max-size")
public class SplitLayoutMinMaxSize extends Div {

    public SplitLayoutMinMaxSize() {
        // tag::snippet[]
        MasterContent master = new MasterContent();
        master.setMinWidth("200px");
        master.setMaxWidth("400px");

        DetailContent detail = new DetailContent();

        SplitLayout splitLayout = new SplitLayout(master, detail);
        // end::snippet[]

        splitLayout.setMaxHeight("280px");
        add(splitLayout);
    }

    public static class Exporter extends DemoExporter<SplitLayoutMinMaxSize> { // hidden-source-line
    } // hidden-source-line
}
