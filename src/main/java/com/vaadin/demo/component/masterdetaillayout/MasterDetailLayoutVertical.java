package com.vaadin.demo.component.masterdetaillayout;

import com.vaadin.flow.component.html.Div;
// import com.vaadin.flow.component.masterdetaillayout.MasterDetailLayout;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("master-detail-layout-vertical")
public class MasterDetailLayoutVertical extends Div {

    public MasterDetailLayoutVertical() {
        // MasterDetailLayout layout = new MasterDetailLayout();

        // tag::snippet[]
        // layout.setOrientation(MasterDetailLayout.Orientation.VERTICAL);
        // end::snippet[]

        // add(layout);
    }

    public static class Exporter extends DemoExporter<MasterDetailLayoutVertical> { // hidden-source-line
    } // hidden-source-line
}

