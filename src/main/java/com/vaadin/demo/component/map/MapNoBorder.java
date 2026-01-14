package com.vaadin.demo.component.map;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.router.Route;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.map.Map;
import com.vaadin.flow.component.map.MapVariant;

@Route("map-no-border")
public class MapNoBorder extends Div {

    public MapNoBorder() {
        Map map = new Map();
        add(map);
        // tag::snippet[]
        map.addThemeVariants(MapVariant.LUMO_NO_BORDER);
        // end::snippet[]
    }

    public static class Exporter extends DemoExporter<MapNoBorder> { // hidden-source-line
    } // hidden-source-line
}
