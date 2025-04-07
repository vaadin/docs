package com.vaadin.demo.component.masterdetaillayout;

import com.vaadin.flow.component.html.Div;
// import com.vaadin.flow.component.masterdetaillayout.MasterDetailLayout;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("master-detail-layout-stack")
public class MasterDetailLayoutStack extends Div {

    public MasterDetailLayoutStack() {
        // MasterDetailLayout layout = new MasterDetailLayout();

        // tag::snippet[]
        // layout.setStackThreshold("700px");
        // end::snippet[]

        // add(layout);
    }

    public static class Exporter extends DemoExporter<MasterDetailLayoutStack> { // hidden-source-line
    } // hidden-source-line
}

