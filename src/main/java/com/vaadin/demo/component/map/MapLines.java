package com.vaadin.demo.component.map;

import java.io.InputStream;
import java.util.List;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.map.Map;
import com.vaadin.flow.component.map.configuration.Coordinate;
import com.vaadin.flow.component.map.configuration.controls.ScaleControl;
import com.vaadin.flow.component.map.configuration.feature.LineStringFeature;
import com.vaadin.flow.router.Route;

import org.springframework.core.io.ClassPathResource;

@Route("map-lines")
public class MapLines extends Div {

    public MapLines() {
        Map map = new Map();
        add(map);

        // tag::snippet[]
        List<Coordinate> routeCoordinates = loadRouteCoordinates();
        LineStringFeature route = new LineStringFeature(routeCoordinates);
        map.getFeatureLayer().addFeature(route);
        map.getControls().getScale().setVisible(true);
        map.getControls().getScale().setUnits(ScaleControl.Unit.NAUTICAL);
        map.zoomToFit(List.of(route), 100, 0);
        // end::snippet[]
    }

    private List<Coordinate> loadRouteCoordinates() {
        try {
            InputStream stream = new ClassPathResource(
                    "data/camino-frances-route.geojson").getInputStream();
            ObjectMapper mapper = new ObjectMapper();
            GeoJsonRoute geoJson = mapper.readValue(stream, GeoJsonRoute.class);
            List<double[]> rawCoordinates = geoJson.getFeatures().get(0)
                    .getGeometry().getCoordinates();
            return rawCoordinates.stream().map(coord -> new Coordinate(coord[0], coord[1]))
                    .toList();
        } catch (Exception e) {
            return List.of();
        }
    }

    public static class Exporter extends DemoExporter<MapLines> { // hidden-source-line
    } // hidden-source-line
}
