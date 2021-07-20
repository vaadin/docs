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
        DetailContent detail = new DetailContent();

        SplitLayout splitLayout = new SplitLayout(master, detail);
        // Sets the width for the first child to 70%, giving
        // the second child the remaining width of 30%
        splitLayout.setSplitterPosition(70);
        // end::snippet[]

        splitLayout.setMaxHeight("280px");
        add(splitLayout);
    }

    public static class Exporter extends DemoExporter<SplitLayoutInitialSplitterPosition> { // hidden-source-line
    } // hidden-source-line
}
