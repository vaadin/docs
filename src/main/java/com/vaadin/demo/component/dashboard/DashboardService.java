package com.vaadin.demo.component.dashboard;

import com.vaadin.hilla.BrowserCallable;
import org.jspecify.annotations.NonNull;

import java.util.List;

// tag::snippet[]
// This is a simple browser-callable server that allows saving and loading a
// dashboard configuration. For this example, we just store the configuration
// in a session-scoped bean. In practice, you'd want to store the configuration
// in a database or some other persistent storage along with the user ID.
@BrowserCallable
public class DashboardService {
    private final DashboardStorage dashboardStorage;

    public DashboardService(DashboardStorage dashboardStorage) {
        this.dashboardStorage = dashboardStorage;
    }

    public void saveDashboard(@NonNull List<@NonNull WidgetConfig> config) {
        dashboardStorage.save(config);
    }

    public List<@NonNull WidgetConfig> loadDashboard() {
        return dashboardStorage.load();
    }
}
// end::snippet[]
