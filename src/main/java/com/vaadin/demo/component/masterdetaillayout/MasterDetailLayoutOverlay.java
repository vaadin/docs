package com.vaadin.demo.component.masterdetaillayout;

import com.vaadin.flow.component.html.Div;
// import com.vaadin.flow.component.masterdetaillayout.MasterDetailLayout;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("master-detail-layout-overlay")
public class MasterDetailLayoutOverlay extends Div {

    public MasterDetailLayoutOverlay() {
        // tag::snippet[]

        // MasterDetailLayout layout = new MasterDetailLayout();
        // add(layout);

        // end::snippet[]
    }

    public static class Exporter extends DemoExporter<MasterDetailLayoutOverlay> { // hidden-source-line
    } // hidden-source-line
}

