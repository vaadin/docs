package com.vaadin.demo.component.gridlayout;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.orderedlayout.GridLayout;
import com.vaadin.flow.component.orderedlayout.GridLayoutVariant;
import com.vaadin.flow.router.Route;

@Route("grid-layout-areas")
public class GridLayoutAreas extends Div {

    public GridLayoutAreas() {
        // tag::snippet[]
        GridLayout layout = new GridLayout();
        layout.setColumns("200px 1fr 200px");
        layout.setRows("auto 1fr auto");
        layout.addThemeVariants(GridLayoutVariant.LUMO_SPACING,
                GridLayoutVariant.LUMO_PADDING);

        // Define named areas
        layout.setTemplateAreas(
                "header header header",
                "nav    main   aside",
                "footer footer footer"
        );

        // Assign components to named areas
        Div header = new Div("Header");
        header.setClassName("example-item");
        layout.add(header);
        layout.setArea(header, "header");

        Div nav = new Div("Nav");
        nav.setClassName("example-item");
        layout.add(nav);
        layout.setArea(nav, "nav");

        Div main = new Div("Main Content");
        main.setClassName("example-item");
        layout.add(main);
        layout.setArea(main, "main");

        Div aside = new Div("Aside");
        aside.setClassName("example-item");
        layout.add(aside);
        layout.setArea(aside, "aside");

        Div footer = new Div("Footer");
        footer.setClassName("example-item");
        layout.add(footer);
        layout.setArea(footer, "footer");
        // end::snippet[]

        layout.setHeight("300px");
        layout.setWidthFull();
        this.setClassName("basic-layouts-example");
        this.add(layout);
    }

    public static class Exporter extends // hidden-source-line
            DemoExporter<GridLayoutAreas> { // hidden-source-line
    } // hidden-source-line
}
