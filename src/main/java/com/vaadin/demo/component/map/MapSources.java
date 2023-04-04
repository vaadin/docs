package com.vaadin.demo.component.map;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.router.Route;
import com.vaadin.flow.component.map.Map;
import com.vaadin.flow.component.map.configuration.layer.TileLayer;
import com.vaadin.flow.component.map.configuration.source.OSMSource;
import com.vaadin.flow.component.map.configuration.source.TileWMSSource;
import com.vaadin.flow.component.map.configuration.source.XYZSource;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.radiobutton.RadioButtonGroup;
import com.vaadin.flow.component.radiobutton.RadioGroupVariant;

import java.util.HashMap;
import java.util.List;

@Route("map-sources")
public class MapSources extends VerticalLayout {
    private static final String OSM_SOURCE = "OpenStreetMap";
    private static final String XYZ_SOURCE = "XYZ (using satellite map via mapbox.com)";
    private static final String WMS_SOURCE = "WMS (using topographical map via mundialis.de)";

    private final Map map;

    public MapSources() {
        map = new Map();
        add(map);

        RadioButtonGroup<String> sourceRadioGroup = new RadioButtonGroup<>();
        sourceRadioGroup.setLabel("Source type");
        sourceRadioGroup.addThemeVariants(RadioGroupVariant.LUMO_VERTICAL);
        sourceRadioGroup.setItems(OSM_SOURCE, XYZ_SOURCE, WMS_SOURCE);
        sourceRadioGroup.addValueChangeListener(e -> {
            if (OSM_SOURCE.equals(e.getValue())) {
                setupOsmSource();
            }
            if (XYZ_SOURCE.equals(e.getValue())) {
                setupXyzSource();
            }
            if (WMS_SOURCE.equals(e.getValue())) {
                setupWmsSource();
            }
        });
        sourceRadioGroup.setValue(OSM_SOURCE);
        add(sourceRadioGroup);

        setPadding(false);
    }

    // tag::snippet[]
    private void setupOsmSource() {
        // OSM does not require any further configuration,
        // it contains presets for URL and attributions
        OSMSource source = new OSMSource();
        TileLayer tileLayer = new TileLayer();
        tileLayer.setSource(source);
        map.setBackgroundLayer(tileLayer);
    }

    private void setupXyzSource() {
        XYZSource.Options sourceOptions = new XYZSource.Options();
        // set the URL pattern for the map service containing x, y, and z
        // parameters
        // mapbox requires an access token, register on
        // mapbox.com to get one, and place it in the line below
        sourceOptions.setUrl(
                "https://api.mapbox.com/v4/mapbox.satellite/{z}/{x}/{y}.jpg90?access_token=<your-access-token>");
        // set actual URL with access token for demo // hidden-source-line
        sourceOptions.setUrl( // hidden-source-line
                "https://api.mapbox.com/v4/mapbox.satellite/{z}/{x}/{y}.jpg90?access_token=pk.eyJ1Ijoic2lzc2JydWVja2VyLXZhYWRpbiIsImEiOiJja3pjcjVwaWkwMXJrMzJtdDlrOWRubHFtIn0.UEQ0LqkVtBcVNRatstiVeQ"); // hidden-source-line
        // using a map service usually requires setting
        // attributions with copyright notices
        sourceOptions.setAttributions(List.of(
                "<a href=\"https://www.mapbox.com/about/maps/\">© Mapbox</a>",
                "<a href=\"https://www.openstreetmap.org/about/\">© OpenStreetMap</a>"));
        sourceOptions.setAttributionsCollapsible(false);
        XYZSource source = new XYZSource(sourceOptions);
        TileLayer tileLayer = new TileLayer();
        tileLayer.setSource(source);
        map.setBackgroundLayer(tileLayer);
    }

    private void setupWmsSource() {
        TileWMSSource.Options sourceOptions = new TileWMSSource.Options();
        // set the URL for the WMS
        sourceOptions.setUrl("https://ows.mundialis.de/services/service");
        // WMS require configuration of request parameters,
        // at least the LAYERS parameter must be specified.
        // Required parameters and possible values can be
        // found in the respective documentation of the service
        HashMap<String, Object> params = new HashMap<>();
        params.put("LAYERS", "TOPO-WMS");
        sourceOptions.setParams(params);
        // using a map service usually requires setting
        // attributions with copyright notices
        sourceOptions.setAttributions(List.of(
                "Contains modified SRTM data (2014)/NASA, processed by <a href=\"https://www.mundialis.de\">mundialis<a/>"));
        sourceOptions.setAttributionsCollapsible(false);
        TileWMSSource source = new TileWMSSource(sourceOptions);
        TileLayer layer = new TileLayer();
        layer.setSource(source);
        map.setBackgroundLayer(layer);
    }
    // end::snippet[]

    public static class Exporter extends DemoExporter<MapSources> { // hidden-source-line
    } // hidden-source-line
}
