package com.vaadin.demo.component.map;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.router.Route;
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
        // For Vaadin 23.1, use Coordinate.fromLonLat to create coordinates
        // from longitude and latitude
        map.setCenter(new Coordinate(-3.9622642, 42.0395433));
        add(map);

        // tag::snippet[]
        // For Vaadin 23.1, use Coordinate.fromLonLat to create coordinates
        // from longitude and latitude
        Coordinate vaadinHqCoordinates = new Coordinate(22.29985, 60.45234);
        Coordinate germanOfficeCoordinates = new Coordinate(13.45489, 52.51390);
        Coordinate usOfficeCoordinates = new Coordinate(-121.92163, 37.36821);

        // Add marker for Vaadin HQ, using default marker image
        MarkerFeature vaadinHq = new MarkerFeature(vaadinHqCoordinates);
        map.getFeatureLayer().addFeature(vaadinHq);

        // Add marker for Vaadin office in Germany, using image from URL
        Icon.Options germanFlagIconOptions = new Icon.Options();
        germanFlagIconOptions.setSrc("images/german_flag.png");
        Icon germanFlagIcon = new Icon(germanFlagIconOptions);
        MarkerFeature germanOffice = new MarkerFeature(germanOfficeCoordinates,
                germanFlagIcon);
        map.getFeatureLayer().addFeature(germanOffice);

        // Add marker for Vaadin office in the US, using image from a
        // StreamResource
        StreamResource streamResource = new StreamResource("us-flag.png",
                () -> getClass().getResourceAsStream(
                        "/META-INF/resources/images/us-flag.png"));
        Icon.Options usFlagIconOptions = new Icon.Options();
        usFlagIconOptions.setImg(streamResource);
        Icon usFlagIcon = new Icon(usFlagIconOptions);
        MarkerFeature usOffice = new MarkerFeature(usOfficeCoordinates,
                usFlagIcon);
        map.getFeatureLayer().addFeature(usOffice);
        // end::snippet[]

        // Override marker icons to use inline images // hidden-source-line
        vaadinHq.setIcon(Icons.DEFAULT_MARKER_ICON); // hidden-source-line
        germanOffice.setIcon(Icons.GERMAN_FLAG_ICON); // hidden-source-line
        usOffice.setIcon(Icons.US_FLAG_ICON); // hidden-source-line
    }

    public static class Exporter extends DemoExporter<MapMarkers> { // hidden-source-line
    } // hidden-source-line
}
