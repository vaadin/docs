package com.vaadin.demo.component.splitlayout;

import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.splitlayout.SplitLayout;
import com.vaadin.flow.component.splitlayout.SplitLayoutVariant;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("split-layout-minimal-theme-variants")
public class SplitLayoutMinimalThemeVariants extends Div {

    public SplitLayoutMinimalThemeVariants() {
        // tag::snippet[]
        MasterContent master = new MasterContent();
        DetailContent detail = new DetailContent();

        SplitLayout splitLayout = new SplitLayout(master, detail);
        splitLayout.addThemeVariants(SplitLayoutVariant.LUMO_MINIMAL);
        // end::snippet[]

        splitLayout.setMaxHeight("280px");
        add(splitLayout);
    }

    public static class Exporter extends DemoExporter<SplitLayoutMinimalThemeVariants> { // hidden-source-line
    } // hidden-source-line
}
