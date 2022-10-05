package com.vaadin.demo.component.map;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.router.Route;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.map.Map;
import com.vaadin.flow.component.map.MapVariant;

@Route("map-theme-borderless")
public class MapThemeBorderless extends Div {

    public MapThemeBorderless() {
        Map map = new Map();
        add(map);
        // tag::snippet[]
        map.addThemeVariants(MapVariant.BORDERLESS);
        // end::snippet[]
    }

    public static class Exporter extends DemoExporter<MapThemeBorderless> { // hidden-source-line
    } // hidden-source-line
}
