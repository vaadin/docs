package com.vaadin.demo.component.splitlayout;

import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.splitlayout.SplitLayout;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("split-layout-basic")
public class SplitLayoutBasic extends Div {

    public SplitLayoutBasic() {
        // tag::snippet[]
        MasterContent master = new MasterContent();
        DetailContent detail = new DetailContent();

        SplitLayout splitLayout = new SplitLayout(master, detail);
        // end::snippet[]

        splitLayout.setMaxHeight("280px");
        add(splitLayout);
    }

    public static class Exporter extends DemoExporter<SplitLayoutBasic> { // hidden-source-line
    } // hidden-source-line
}
