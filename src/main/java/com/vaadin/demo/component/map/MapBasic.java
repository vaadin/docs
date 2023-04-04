package com.vaadin.demo.component.map;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.router.Route;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.map.Map;

@Route("map-basic")
public class MapBasic extends Div {

    public MapBasic() {
        // tag::snippet[]
        // Create a new map, this will use the OpenStreetMap service by default
        Map map = new Map();
        add(map);
        // end::snippet[]
    }

    public static class Exporter extends DemoExporter<MapBasic> { // hidden-source-line
    } // hidden-source-line
}
