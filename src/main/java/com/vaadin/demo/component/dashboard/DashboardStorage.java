package com.vaadin.demo.component.dashboard;

import org.springframework.stereotype.Component;
import org.springframework.web.context.annotation.SessionScope;

import java.util.List;

@SessionScope
@Component
public class DashboardStorage {
    private List<DashboardEditable.WidgetConfig> config;

    public List<DashboardEditable.WidgetConfig> load() {
        return config;
    }

    public void save(List<DashboardEditable.WidgetConfig> config) {
        this.config = config;
    }
}
