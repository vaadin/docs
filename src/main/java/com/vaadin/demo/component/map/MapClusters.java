package com.vaadin.demo.component.map;

import com.vaadin.demo.DemoExporter;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.map.Map;
import com.vaadin.flow.component.map.configuration.Coordinate;
import com.vaadin.flow.component.map.configuration.Feature;
import com.vaadin.flow.component.map.configuration.feature.MarkerFeature;
import com.vaadin.flow.component.map.events.FeatureEventDetails;
import com.vaadin.flow.router.Route;

import java.util.List;
import java.util.Random;

@Route("map-clusters")
public class MapClusters extends Div {

    public MapClusters() {
        Map map = new Map();
        add(map);

        // tag::snippet[]
        // Create a large number of random markers
        final int NUM_MARKERS = 200;
        Random random = new Random(539561L);

        for (int i = 0; i < NUM_MARKERS; i++) {
            double lon = -60 + (120 * random.nextDouble());
            double lat = -45 + (90 * random.nextDouble());
            MarkerFeature marker = new MarkerFeature(new Coordinate(lon, lat));
            map.getFeatureLayer().addFeature(marker);
            // Override marker icons to use inline images // hidden-source-line
            marker.setIcon(Icons.createDefaultIcon()); // hidden-source-line
        }

        // Enable clustering
        map.getFeatureLayer().setClusteringEnabled(true);

        // Zoom to cluster contents on click
        map.addClusterClickListener(event -> {
            List<Feature> features = event.getFeatures();
            map.zoomToFit(features);
        });
        // end::snippet[]

        // Override cluster icon to use inline images // hidden-source-line
        map.getFeatureLayer().getClusterStyle().setImage(Icons.createClusterIcon()); // hidden-source-line
    }

    public static class Exporter extends DemoExporter<MapClusters> { // hidden-source-line
    } // hidden-source-line
}
