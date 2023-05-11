package com.vaadin.demo.component.map;

import com.vaadin.demo.DemoExporter;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.map.Map;
import com.vaadin.flow.component.map.configuration.Coordinate;
import com.vaadin.flow.component.map.configuration.feature.MarkerFeature;
import com.vaadin.flow.component.map.configuration.style.TextStyle;
import com.vaadin.flow.router.Route;

@Route("map-marker-text")
public class MapMarkerText extends Div {

    public MapMarkerText() {
        Map map = new Map();
        add(map);

        // tag::snippet[]
        // Create a marker with a default text style
        MarkerFeature marker = new MarkerFeature(new Coordinate(-25, 0));
        marker.setLabel("Some text");
        map.getFeatureLayer().addFeature(marker);

        // Create a marker with a custom text style
        TextStyle textStyle = new TextStyle();
        // Customize font and color
        textStyle.setFont("bold 16px sans-serif");
        textStyle.setStroke("#fdf4ff", 3);
        textStyle.setFill("#701a75");
        // Position text to the right of the icon
        textStyle.setTextAlign(TextStyle.TextAlign.LEFT);
        textStyle.setOffset(22, -18);
        // Set default for baseline, otherwise sync fails // hidden-source-line
        // Can be removed after https://github.com/vaadin/flow-components/pull/5048 is released // hidden-source-line
        textStyle.setTextBaseline(TextStyle.TextBaseline.MIDDLE); // hidden-source-line

        MarkerFeature customizedMarker = new MarkerFeature(new Coordinate(25, 0));
        customizedMarker.setLabel("Customized text");
        customizedMarker.getStyle().setTextStyle(textStyle);
        map.getFeatureLayer().addFeature(customizedMarker);
        // end::snippet[]

        // Override marker icons to use inline images // hidden-source-line
        marker.setIcon(Icons.createDefaultIcon()); // hidden-source-line
        customizedMarker.setIcon(Icons.createDefaultIcon()); // hidden-source-line
    }

    public static class Exporter extends DemoExporter<MapMarkerText> { // hidden-source-line
    } // hidden-source-line
}
