package com.vaadin.demo.component.htmlelements;

import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Table;
import com.vaadin.flow.component.html.TableRow;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.signals.local.ListSignal;

import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("table-signal-rows")
public class TableSignalRows extends Div {

    record Planet(String name, String mass, String diameter) {
    }

    public TableSignalRows() {
        setClassName("html-table-example"); // hidden-source-line
        // tag::snippet[]
        ListSignal<Planet> planets = new ListSignal<>();
        planets.insertLast(new Planet("Mercury", "0.330", "4,879"));
        planets.insertLast(new Planet("Venus", "4.87", "12,104"));

        Table table = new Table();
        table.setCaptionText("Data about the planets of our solar system");
        table.addHeaderRow("Name", "Mass (10^24 kg)", "Diameter (km)");

        table.getBody().bindChildren(planets, planetSignal -> {
            Planet planet = planetSignal.peek();
            TableRow row = new TableRow();
            row.addRowHeaderCell(planet.name());
            row.addDataCells(planet.mass(), planet.diameter());
            return row;
        });

        Button addEarth = new Button("Add Earth", event -> planets
                .insertLast(new Planet("Earth", "5.97", "12,756")));
        // end::snippet[]

        add(new VerticalLayout(table, addEarth));
    }

    public static class Exporter extends DemoExporter<TableSignalRows> { // hidden-source-line
    } // hidden-source-line
}
