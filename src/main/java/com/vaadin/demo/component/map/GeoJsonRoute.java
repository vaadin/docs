package com.vaadin.demo.component.map;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public class GeoJsonRoute {
    private List<GeoJsonFeature> features;

    public List<GeoJsonFeature> getFeatures() {
        return features;
    }

    public void setFeatures(List<GeoJsonFeature> features) {
        this.features = features;
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class GeoJsonFeature {
        private GeoJsonGeometry geometry;

        public GeoJsonGeometry getGeometry() {
            return geometry;
        }

        public void setGeometry(GeoJsonGeometry geometry) {
            this.geometry = geometry;
        }
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class GeoJsonGeometry {
        private List<double[]> coordinates;

        public List<double[]> getCoordinates() {
            return coordinates;
        }

        public void setCoordinates(List<double[]> coordinates) {
            this.coordinates = coordinates;
        }
    }
}
