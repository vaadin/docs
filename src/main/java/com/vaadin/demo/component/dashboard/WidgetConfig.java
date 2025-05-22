package com.vaadin.demo.component.dashboard;

import org.jspecify.annotations.NonNull;

// tag::snippet[]
// In order to save and load the dashboard configuration we need a class for storing
// the configuration of individual widgets. In this example we'll use a class that
// holds the widget type, colspan, and rowspan.
public class WidgetConfig {
    public enum WidgetType {
        VISITORS("Visitors"),
        DOWNLOADS("Downloads"),
        CONVERSIONS("Conversions"),
        VISITORS_BY_COUNTRY("Visitors by country"),
        BROWSER_DISTRIBUTION("Browser distribution"),
        CAT_IMAGE("Cat image"),
        VISITORS_BY_BROWSER("Visitors by browser");

        private final String label;

        WidgetType(String label) {
            this.label = label;
        }

        public String getLabel() {
            return label;
        }
    }

    private WidgetType type;
    private int colspan;
    private int rowspan;

    public WidgetConfig() {
    }

    public WidgetConfig(WidgetType type, int colspan, int rowspan) {
        this.type = type;
        this.colspan = colspan;
        this.rowspan = rowspan;
    }

    @NonNull
    public WidgetType getType() {
        return type;
    }

    public void setType(WidgetType type) {
        this.type = type;
    }

    @NonNull
    public int getColspan() {
        return colspan;
    }

    public void setColspan(int colspan) {
        this.colspan = colspan;
    }

    @NonNull
    public int getRowspan() {
        return rowspan;
    }

    public void setRowspan(int rowspan) {
        this.rowspan = rowspan;
    }
}
// end::snippet[]
