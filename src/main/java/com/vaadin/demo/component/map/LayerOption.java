package com.vaadin.demo.component.map;

/**
 * Helper class for representing options in radio buttons
 */
class LayerOption {
    String name;
    String url;
    String attributions;

    public LayerOption(String name, String url, String attributions) {
        this.name = name;
        this.url = url;
        this.attributions = attributions;
    }

    public String getName() {
        return name;
    }

    public String getUrl() {
        return url;
    }

    public String getAttributions() {
        return attributions;
    }
}
