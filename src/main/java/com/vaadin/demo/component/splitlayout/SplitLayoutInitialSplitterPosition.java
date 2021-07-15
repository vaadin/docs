package com.vaadin.demo.component.splitlayout;

import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.splitlayout.SplitLayout;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("split-layout-initial-splitter-position")
public class SplitLayoutInitialSplitterPosition extends Div {

    public SplitLayoutInitialSplitterPosition() {
        // tag::snippet[]
        MasterContent master = new MasterContent();
        master.setWidth("50%");

        DetailContent detail = new DetailContent();
        detail.setWidth("50%");

        SplitLayout splitLayout = new SplitLayout(master, detail);
        // end::snippet[]

        splitLayout.setMaxHeight("280px");
        add(splitLayout);
    }

    public static class Exporter extends DemoExporter<SplitLayoutInitialSplitterPosition> { // hidden-source-line
    } // hidden-source-line
}
