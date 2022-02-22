package com.vaadin.demo.component.map;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.demo.flow.routing.Route;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.map.Map;
import com.vaadin.flow.component.map.configuration.layer.Layer;
import com.vaadin.flow.component.map.configuration.layer.TileLayer;
import com.vaadin.flow.component.map.configuration.source.XYZSource;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.radiobutton.RadioButtonGroup;
import com.vaadin.flow.component.radiobutton.RadioGroupVariant;

import java.util.HashMap;
import java.util.List;

@Route("map-layers")
public class MapLayers extends Div {

    // NOTE: Several of the used services here require API keys, you can register for an account to get one,
    // and then place it into the URLs below

    // Background layers
    private static final LayerOption OPEN_STREET_MAP_LAYER = new LayerOption(
            "OpenStreetMap",
            "https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png",
            "&#169; <a href=\"https://www.openstreetmap.org/copyright\" target=\"_blank\">OpenStreetMap</a> contributors.");
    private static final LayerOption OPEN_CYCLE_MAP_LAYER = new LayerOption(
            "OpenCycleMap",
            "https://tile.thunderforest.com/cycle/{z}/{x}/{y}.png?apikey=<your-api-key-here>",
            "Maps © <a href=\"https://www.thunderforest.com\" target=\"_blank\">Thunderforest</a>, Data © <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap contributors</a>");
    private static final LayerOption TRANSPORT_MAP_LAYER = new LayerOption(
            "Transport Map",
            "https://tile.thunderforest.com/transport/{z}/{x}/{y}.png?apikey=<your-api-key-here>",
            "Maps © <a href=\"https://www.thunderforest.com\" target=\"_blank\">Thunderforest</a>, Data © <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap contributors</a>");

    // Overlay layers
    private static final LayerOption NONE_LAYER = new LayerOption("None", null, null);
    private static final LayerOption PRECIPITATION_LAYER = new LayerOption(
            "Precipitation",
            "https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=<your-api-key-here>",
            "<a href=\"https://openweathermap.org/\" target=\"_blank\">OpenWeather</a>");
    private static final LayerOption AIR_TEMPERATURE_LAYER = new LayerOption(
            "Air Temperature",
            "https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=<your-api-key-here>",
            "<a href=\"https://openweathermap.org/\" target=\"_blank\">OpenWeather</a>");
    private static final LayerOption WIND_SPEED_LAYER = new LayerOption(
            "Wind Speed",
            "https://tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid=<your-api-key-here>",
            "<a href=\"https://openweathermap.org/\" target=\"_blank\">OpenWeather</a>");
    // Override URLs with actual API keys  // hidden-source-line
    static {  // hidden-source-line
        OPEN_CYCLE_MAP_LAYER.url = "https://tile.thunderforest.com/cycle/{z}/{x}/{y}.png?apikey=187baf2db9fc454896c700ef9e87f499"; // hidden-source-line
        TRANSPORT_MAP_LAYER.url = "https://tile.thunderforest.com/transport/{z}/{x}/{y}.png?apikey=187baf2db9fc454896c700ef9e87f499"; // hidden-source-line
        PRECIPITATION_LAYER.url = "https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=819f0dfe0ecf7a5dbbac07c170703aab"; // hidden-source-line
        AIR_TEMPERATURE_LAYER.url = "https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=819f0dfe0ecf7a5dbbac07c170703aab"; // hidden-source-line
        WIND_SPEED_LAYER.url = "https://tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid=819f0dfe0ecf7a5dbbac07c170703aab"; // hidden-source-line
    } // hidden-source-line

    private final HashMap<LayerOption, Layer> overlayLayerMap = new HashMap<>();
    private Layer selectedOverlayLayer;

    public MapLayers() {
        // Create a new map, this will use the OpenStreetMap service by default
        Map map = new Map();
        map.setWidthFull();
        map.setHeight("300px");
        add(map);

        // tag::snippet[]
        // Configure radio buttons for changing background layer
        RadioButtonGroup<LayerOption> backgroundLayerGroup = new RadioButtonGroup<>();
        backgroundLayerGroup.setItems(OPEN_STREET_MAP_LAYER, OPEN_CYCLE_MAP_LAYER, TRANSPORT_MAP_LAYER);
        backgroundLayerGroup.setValue(OPEN_STREET_MAP_LAYER);
        backgroundLayerGroup.addValueChangeListener(e -> {
            LayerOption selectedOption = e.getValue();
            XYZSource source = new XYZSource(new XYZSource.Options()
                    .setUrl(selectedOption.getUrl())
                    .setAttributions(List.of(selectedOption.getAttributions()))
                    .setAttributionsCollapsible(false));
            TileLayer layer = new TileLayer();
            layer.setSource(source);
            map.setBackgroundLayer(layer);
        });

        // Add all overlay layers at once, make them invisible initially
        List.of(PRECIPITATION_LAYER, AIR_TEMPERATURE_LAYER, WIND_SPEED_LAYER).forEach(option -> {
            XYZSource source = new XYZSource(new XYZSource.Options()
                    .setUrl(option.getUrl())
                    .setAttributions(List.of(option.getAttributions()))
                    .setAttributionsCollapsible(false));
            TileLayer layer = new TileLayer();
            layer.setSource(source);
            layer.setVisible(false);

            map.addLayer(layer);
            overlayLayerMap.put(option, layer);
        });

        // Configure radio buttons for toggling visibility of overlays
        RadioButtonGroup<LayerOption> overlayLayerGroup = new RadioButtonGroup<>();
        overlayLayerGroup.setItems(NONE_LAYER, PRECIPITATION_LAYER, AIR_TEMPERATURE_LAYER, WIND_SPEED_LAYER);
        overlayLayerGroup.setValue(NONE_LAYER);
        overlayLayerGroup.addValueChangeListener(e -> {
            LayerOption selectedOption = e.getValue();
            // Make previously selected layer invisible
            if (selectedOverlayLayer != null) {
                selectedOverlayLayer.setVisible(false);
            }
            // Get next selected layer
            selectedOverlayLayer = overlayLayerMap.get(selectedOption);
            // Make selected layer visible, unless it's the none option
            if (selectedOverlayLayer != null) {
                selectedOverlayLayer.setVisible(true);
            }
        });
        // end::snippet[]

        backgroundLayerGroup.setLabel("Background Layer");
        backgroundLayerGroup.setItemLabelGenerator(LayerOption::getName);
        backgroundLayerGroup.addThemeVariants(RadioGroupVariant.LUMO_VERTICAL);

        overlayLayerGroup.setLabel("Overlay Layer");
        overlayLayerGroup.setItemLabelGenerator(LayerOption::getName);
        overlayLayerGroup.addThemeVariants(RadioGroupVariant.LUMO_VERTICAL);

        add(new HorizontalLayout(backgroundLayerGroup, overlayLayerGroup));
    }

    public static class Exporter extends DemoExporter<MapLayers> {} // hidden-source-line
}
