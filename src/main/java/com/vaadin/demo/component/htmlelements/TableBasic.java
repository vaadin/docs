package com.vaadin.demo.component.htmlelements;

import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Table;
import com.vaadin.flow.router.Route;

import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("table-basic")
public class TableBasic extends Div {

    public TableBasic() {
        setClassName("html-table-example"); // hidden-source-line
        // tag::snippet[]
        Table table = new Table();
        table.setCaptionText("Data about the planets of our solar system");

        table.addHeaderRow("Name", "Mass (10^24 kg)", "Diameter (km)");

        table.addRowWithHeader("Mercury", "0.330", "4,879");
        table.addRowWithHeader("Venus", "4.87", "12,104");
        table.addRowWithHeader("Earth", "5.97", "12,756");

        add(table);
        // end::snippet[]
    }

    public static class Exporter extends DemoExporter<TableBasic> { // hidden-source-line
    } // hidden-source-line
}
