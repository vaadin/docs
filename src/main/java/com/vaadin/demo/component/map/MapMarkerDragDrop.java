package com.vaadin.demo.component.map;

import com.vaadin.demo.DemoExporter;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.map.Map;
import com.vaadin.flow.component.map.configuration.Coordinate;
import com.vaadin.flow.component.map.configuration.feature.MarkerFeature;
import com.vaadin.flow.component.notification.Notification;
import com.vaadin.flow.router.Route;

@Route("map-marker-drag-drop")
public class MapMarkerDragDrop extends Div {

    public MapMarkerDragDrop() {
        Map map = new Map();
        add(map);

        // tag::snippet[]
        // Add draggable marker
        MarkerFeature marker = new MarkerFeature();
        marker.setId("draggable-marker");
        marker.setDraggable(true);
        marker.setText("Drag me");
        map.getFeatureLayer().addFeature(marker);

        // Listen to marker drop event
        map.addFeatureDropListener(event -> {
            MarkerFeature droppedMarker = (MarkerFeature) event.getFeature();
            Coordinate startCoordinates = event.getStartCoordinate();
            Coordinate endCoordinates = event.getCoordinate();

            Notification.show("Marker \"" + droppedMarker.getId() + "\" dragged from " + startCoordinates + " to " + endCoordinates);
        });
        // end::snippet[]
        // Override marker icon to use inline images // hidden-source-line
        marker.setIcon(Icons.createDefaultIcon()); // hidden-source-line
    }

    public static class Exporter extends DemoExporter<MapMarkerDragDrop> { // hidden-source-line
    } // hidden-source-line
}
