package com.vaadin.demo.component.dashboard;

import org.springframework.stereotype.Component;
import org.springframework.web.context.annotation.SessionScope;

import java.util.List;

// tag::snippet[]
@SessionScope
@Component
public class DashboardStorage {
    private List<WidgetConfig> config;

    public List<WidgetConfig> load() {
        return config;
    }

    public void save(List<WidgetConfig> config) {
        this.config = config;
    }
}
// end::snippet[]
