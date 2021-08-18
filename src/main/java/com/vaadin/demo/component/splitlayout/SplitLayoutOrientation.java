package com.vaadin.demo.component.splitlayout;

import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.splitlayout.SplitLayout;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("split-layout-orientation")
public class SplitLayoutOrientation extends Div {

    public SplitLayoutOrientation() {
        // tag::snippet[]
        MasterContent master = new MasterContent();
        DetailContent detail = new DetailContent();

        SplitLayout splitLayout = new SplitLayout(master, detail);
        splitLayout.setOrientation(SplitLayout.Orientation.VERTICAL);
        // end::snippet[]

        splitLayout.setMaxHeight("350px");
        add(splitLayout);
    }

    public static class Exporter extends DemoExporter<SplitLayoutOrientation> { // hidden-source-line
    } // hidden-source-line
}
