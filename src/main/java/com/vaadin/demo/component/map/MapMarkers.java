package com.vaadin.demo.component.map;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.demo.flow.routing.Route;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.map.Map;
import com.vaadin.flow.component.map.configuration.Coordinate;
import com.vaadin.flow.component.map.configuration.feature.MarkerFeature;
import com.vaadin.flow.component.map.configuration.style.Icon;
import com.vaadin.flow.server.StreamResource;

@Route("map-markers")
public class MapMarkers extends Div {

    public MapMarkers() {
        Span title = new Span("Map showing Vaadin office locations");
        add(title);

        Map map = new Map();
        map.setWidthFull();
        map.setHeight("300px");
        map.getView().setCenter(new Coordinate(-441077.2276714613, 5166904.667008546));
        add(map);

        // tag::snippet[]
        // Add marker for Vaadin HQ, using default marker image
        Coordinate vaadinHqCoordinates = Coordinate.fromLonLat(22.29985, 60.45234);
        MarkerFeature vaadinHq = new MarkerFeature(vaadinHqCoordinates);
        map.getFeatureLayer().addFeature(vaadinHq);

        // Add marker for Vaadin office in Germany, using image from URL
        Coordinate germanOfficeCoordinates = Coordinate.fromLonLat(13.45489, 52.51390);
        Icon germanFlagIcon = new Icon(new Icon.Options()
                .setSrc("images/german_flag.png"));
        MarkerFeature germanOffice = new MarkerFeature(germanOfficeCoordinates, germanFlagIcon);
        map.getFeatureLayer().addFeature(germanOffice);

        // Add marker for Vaadin office in the US, using image from a StreamResource
        Coordinate usOfficeCoordinates = Coordinate.fromLonLat(-121.92163, 37.36821);
        StreamResource streamResource = new StreamResource("us-flag.png",
                () -> getClass().getResourceAsStream("/META-INF/resources/images/us-flag.png"));
        Icon usFlagIcon = new Icon(new Icon.Options().setImg(streamResource));
        MarkerFeature usOffice = new MarkerFeature(usOfficeCoordinates, usFlagIcon);
        map.getFeatureLayer().addFeature(usOffice);
        // end::snippet[]

        // Override marker icons to use inline images // hidden-source-line
        vaadinHq.setIcon(Icons.defaultMarkerIcon); // hidden-source-line
        germanOffice.setIcon(Icons.germanFlagIcon); // hidden-source-line
        usOffice.setIcon(Icons.usFlagIcon); // hidden-source-line
    }

    public static class Exporter extends DemoExporter<MapMarkers> {} // hidden-source-line
}
