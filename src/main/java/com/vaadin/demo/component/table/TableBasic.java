package com.vaadin.demo.component.table;

import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Table;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("table-basic")
public class TableBasic extends Div {

    public TableBasic() {
        // tag::snippet[]
        Table table = new Table();
        table.setCaptionText("Planets of the inner solar system");

        // Fills a <thead> row with <th scope="col"> cells
        table.addHeaderRow("Name", "Mass (10^24 kg)", "Diameter (km)");

        // Each row starts with a <th scope="row"> labelling it
        table.addRowWithHeader("Mercury", "0.330", "4,879");
        table.addRowWithHeader("Venus", "4.87", "12,104");
        table.addRowWithHeader("Earth", "5.97", "12,756");
        table.addRowWithHeader("Mars", "0.642", "6,792");
        // end::snippet[]

        Styles.applyTo(table); // hidden-source-line
        add(table);
    }

    public static class Exporter extends DemoExporter<TableBasic> { // hidden-source-line
    } // hidden-source-line
}
