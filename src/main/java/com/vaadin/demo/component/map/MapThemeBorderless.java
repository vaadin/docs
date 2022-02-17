package com.vaadin.demo.component.map;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.demo.flow.routing.Route;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.map.Map;

@Route("map-theme-borderless")
public class MapThemeBorderless extends Div {

    public MapThemeBorderless() {
        Map map = new Map();
        add(map);
        // tag::snippet[]
        map.setThemeName("borderless");
        // end::snippet[]
    }

    public static class Exporter extends DemoExporter<MapThemeBorderless> {} // hidden-source-line
}
