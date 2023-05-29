package com.vaadin.demo.component.map;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.router.Route;
import com.vaadin.flow.component.map.Map;
import com.vaadin.flow.component.map.configuration.Coordinate;
import com.vaadin.flow.component.map.configuration.Extent;
import com.vaadin.flow.component.map.configuration.Feature;
import com.vaadin.flow.component.map.configuration.feature.MarkerFeature;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.textfield.TextArea;

import java.util.HashMap;
import java.util.List;

@Route("map-events")
public class MapEvents extends VerticalLayout {
    // For Vaadin 23.1, use Coordinate.fromLonLat to create coordinates
    // from longitude and latitude
    private static final City BERLIN = new City("Berlin",
            new Coordinate(13.404954, 52.520008));
    private static final City HONG_KONG = new City("Hong Kong",
            new Coordinate(114.162813, 22.279328));
    private static final City MOSCOW = new City("Moscow",
            new Coordinate(37.617298, 55.755825));
    private static final City NEW_YORK = new City("New York",
            new Coordinate(-74.005974, 40.712776));
    private static final City RIO = new City("Rio de Janeiro",
            new Coordinate(-43.2093727, -22.9110137));
    private static final List<City> CITIES = List.of(BERLIN, HONG_KONG, MOSCOW,
            NEW_YORK, RIO);

    public MapEvents() {
        Map map = new Map();
        // For Vaadin 23.1, use Coordinate.fromLonLat to create coordinates
        // from longitude and latitude
        map.setCenter(new Coordinate(-3.9622642, 42.0395433));
        add(map);

        // Setup text areas for logging event data
        TextArea viewEventInfo = new TextArea("View Move End Event");
        viewEventInfo.setReadOnly(true);
        viewEventInfo.setWidthFull();
        viewEventInfo.addThemeName("monospace");
        TextArea mapClickInfo = new TextArea("Map Click Event");
        mapClickInfo.setReadOnly(true);
        mapClickInfo.setWidthFull();
        mapClickInfo.addThemeName("monospace");
        TextArea featureClickInfo = new TextArea("Feature Click Event");
        featureClickInfo.setReadOnly(true);
        featureClickInfo.setWidthFull();
        featureClickInfo.addThemeName("monospace");
        add(viewEventInfo, mapClickInfo, featureClickInfo);

        // Add markers for cities
        HashMap<Feature, City> cityLookup = new HashMap<>();
        CITIES.forEach(city -> {
            MarkerFeature cityMarker = new MarkerFeature(city.coordinates);
            // Override marker icons to use inline images // hidden-source-line
            cityMarker.setIcon(Icons.createDefaultIcon()); // hidden-source-line
            map.getFeatureLayer().addFeature(cityMarker);
            // Store relation between cities and markers in a hash map
            cityLookup.put(cityMarker, city);
        });

        // tag::snippet[]
        map.addViewMoveEndEventListener(e -> {
            Coordinate center = e.getCenter();
            Extent extent = e.getExtent();
            String info = "";
            info += String.format("Center = { x: %s, y: %s }%n", center.getX(),
                    center.getY());
            info += String.format("Zoom   = %s%n", e.getZoom());
            info += String.format("Extent = { left: %s, top: %s,%n",
                    extent.getMinX(), extent.getMinY());
            info += String.format("           right: %s, bottom: %s }",
                    extent.getMaxX(), extent.getMaxY());
            viewEventInfo.setValue(info);
        });

        map.addClickEventListener(e -> {
            Coordinate coordinates = e.getCoordinate();
            String info = String.format("Coordinates = { x: %s, y: %s }",
                    coordinates.getX(), coordinates.getY());
            mapClickInfo.setValue(info);
        });

        map.addFeatureClickListener(e -> {
            MarkerFeature feature = (MarkerFeature) e.getFeature();
            Coordinate coordinates = feature.getCoordinates();
            // Get city entity for event marker,
            // see remaining example on how the markers are set up
            City city = cityLookup.get(feature);
            String info = "";
            info += String.format("City        = %s%n", city.getName());
            info += String.format("Coordinates = { x: %s, y: %s }",
                    coordinates.getX(), coordinates.getY());
            featureClickInfo.setValue(info);
        });
        // end::snippet[]
        setSpacing(false);
        setPadding(false);
    }

    private static class City {
        private final String name;
        private final Coordinate coordinates;

        public String getName() {
            return name;
        }

        public Coordinate getCoordinates() {
            return coordinates;
        }

        public City(String name, Coordinate coordinates) {
            this.name = name;
            this.coordinates = coordinates;
        }
    }

    public static class Exporter extends DemoExporter<MapEvents> { // hidden-source-line
    } // hidden-source-line
}
