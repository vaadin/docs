package com.vaadin.demo.component.map;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.map.Map;
import com.vaadin.flow.component.map.configuration.Coordinate;
import com.vaadin.flow.component.map.configuration.feature.PolygonFeature;
import com.vaadin.flow.router.Route;

import java.util.List;

@Route("map-polygons")
public class MapPolygons extends Div {

    public MapPolygons() {
        Map map = new Map();
        map.setCenter(new Coordinate(-3.9622642, 42.0395433));
        add(map);

        // tag::snippet[]
        PolygonFeature polygon = new PolygonFeature(List.of(
                new Coordinate(-50, 50),
                new Coordinate(-10, 50),
                new Coordinate(-10, 10),
                new Coordinate(-50, 10),
                new Coordinate(-50, 50) // Closing the polygon
        ));
        map.getFeatureLayer().addFeature(polygon);

        PolygonFeature polygonWithHole = new PolygonFeature();
        polygonWithHole.setCoordinates(new Coordinate[][]{
                new Coordinate[]{
                        new Coordinate(30, 50),
                        new Coordinate(70, 50),
                        new Coordinate(70, 10),
                        new Coordinate(30, 10),
                        new Coordinate(30, 50) // Closing the polygon
                },
                new Coordinate[]{
                        new Coordinate(35, 45),
                        new Coordinate(65, 45),
                        new Coordinate(65, 15),
                        new Coordinate(35, 15),
                        new Coordinate(35, 45) // Closing the hole
                }
        });
        map.getFeatureLayer().addFeature(polygonWithHole);
        // end::snippet[]
    }

    public static class Exporter extends DemoExporter<MapPolygons> { // hidden-source-line
    } // hidden-source-line
}
