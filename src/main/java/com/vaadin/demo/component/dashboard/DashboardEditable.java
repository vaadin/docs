package com.vaadin.demo.component.dashboard;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.contextmenu.MenuItem;
import com.vaadin.flow.component.dashboard.Dashboard;
import com.vaadin.flow.component.dashboard.DashboardWidget;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.menubar.MenuBar;
import com.vaadin.flow.component.menubar.MenuBarVariant;
import com.vaadin.flow.router.Route;

import java.util.List;

@Route("dashboard-editable")
public class DashboardEditable extends Div {

    private final DashboardStorage dashboardStorage;
    private Dashboard dashboard;

    // tag::snippet[]
    // NOTE: This example uses the additional classes WidgetConfig and
    // DashboardStorage, which you can find by switching to the respective file
    // tab.

    // Since the default DashboardWidget class doesn't allow setting custom
    // data, we create a custom class that extends DashboardWidget, and add a
    // field for storing the widget type.
    public static class CustomWidget extends DashboardWidget {
        private final WidgetConfig.WidgetType type;

        public CustomWidget(WidgetConfig.WidgetType type, String title) {
            super(title);
            this.type = type;
        }

        public WidgetConfig.WidgetType getType() {
            return type;
        }
    }

    // This is the default configuration for the dashboard. Note that the order
    // of the widgets in the list determines the order in which they are
    // displayed in the dashboard.
    private final List<WidgetConfig> defaultConfig = List.of(
            new WidgetConfig(WidgetConfig.WidgetType.VISITORS, 1, 1),
            new WidgetConfig(WidgetConfig.WidgetType.DOWNLOADS, 1, 1),
            new WidgetConfig(WidgetConfig.WidgetType.CONVERSIONS, 1, 1),
            new WidgetConfig(WidgetConfig.WidgetType.VISITORS_BY_COUNTRY, 1, 2),
            new WidgetConfig(WidgetConfig.WidgetType.BROWSER_DISTRIBUTION, 1,
                    1),
            new WidgetConfig(WidgetConfig.WidgetType.CAT_IMAGE, 1, 1),
            new WidgetConfig(WidgetConfig.WidgetType.VISITORS_BY_BROWSER, 2,
                    1));

    public DashboardEditable(DashboardStorage dashboardStorage) {
        this.dashboardStorage = dashboardStorage;

        createToolbar();
        createDashboard();
    }

    private void createDashboard() {
        // Create dashboard and load initial configuration
        dashboard = new Dashboard();
        loadConfiguration();

        dashboard.setMinimumColumnWidth("150px");
        dashboard.setMaximumColumnCount(3);
        add(dashboard);
    }

    private void createToolbar() {
        MenuBar toolbar = new MenuBar();
        toolbar.addThemeVariants(MenuBarVariant.LUMO_DROPDOWN_INDICATORS);

        MenuItem edit = toolbar.addItem("Edit");
        edit.addThemeNames("primary");
        edit.addClickListener(event -> {
            if (dashboard.isEditable()) {
                dashboard.setEditable(false);
                edit.setText("Edit");
            } else {
                dashboard.setEditable(true);
                edit.setText("Apply");
            }
        });

        MenuItem save = toolbar.addItem("Save");
        save.addClickListener(event -> saveConfiguration());

        MenuItem load = toolbar.addItem("Load");
        load.addClickListener(event -> loadConfiguration());

        MenuItem addWidget = toolbar.addItem("Add widget");
        for (WidgetConfig.WidgetType widgetType : WidgetConfig.WidgetType
                .values()) {
            addWidget.getSubMenu().addItem(widgetType.getLabel(),
                    event -> addWidget(widgetType));
        }

        MenuItem restore = toolbar.addItem("Restore default");
        restore.addThemeNames("error");
        restore.addClickListener(event -> restoreDefault());

        add(toolbar);
    }

    private void saveConfiguration() {
        // To save the dashboard configuration, we iterate over the current
        // widgets in the dashboard and map them into configuration objects.
        List<WidgetConfig> dashboardConfig = dashboard.getWidgets().stream()
                .map(widget -> {
                    // Cast to our custom widget class and extract type,
                    // colspan, and rowspan
                    CustomWidget customWidget = (CustomWidget) widget;
                    return new WidgetConfig(customWidget.getType(),
                            widget.getColspan(), widget.getRowspan());
                }).toList();

        // Then save the configuration to the database or other storage
        // In this example, we just store it in a session-scoped bean
        dashboardStorage.save(dashboardConfig);
    }

    private void loadConfiguration() {
        // Load the dashboard configuration from database or other storage
        // In this example, we just load it from a session-scoped bean
        // If no configuration is found, use the default configuration
        List<WidgetConfig> dashboardConfig = dashboardStorage.load();
        if (dashboardConfig == null) {
            dashboardConfig = defaultConfig;
        }

        applyConfiguration(dashboardConfig);
    }

    private void applyConfiguration(List<WidgetConfig> dashboardConfig) {
        // To apply a dashboard configuration, we first clear the dashboard and
        // then create widgets based on the configuration
        dashboard.removeAll();
        for (WidgetConfig config : dashboardConfig) {
            CustomWidget widget = createWidget(config);
            dashboard.add(widget);
        }
    }

    private CustomWidget createWidget(WidgetConfig config) {
        // In this example all widget types have the same content, and the title
        // is stored in the enum, so we can use generic logic to create a widget
        CustomWidget widget = new CustomWidget(config.getType(),
                config.getType().getLabel());
        widget.setContent(createWidgetContent());
        widget.setColspan(config.getColspan());
        widget.setRowspan(config.getRowspan());

        // In practice, different widget types will have different content. In
        // that case
        // you can use a switch statement to create the widget content based on
        // the type.
        //
        // @formatter:off hidden-source-line
        // switch (config.type()) {
        //     case VISITORS:
        //         widget.setTitle("Visitors");
        //         widget.setContent(new VisitorsWidgetContent());
        //         break;
        //     ...
        // }
        // @formatter:on hidden-source-line
        return widget;
    }

    private void addWidget(WidgetConfig.WidgetType widgetType) {
        // For adding a new widget, we retrieve the default configuration for
        // the widget type and create a widget based on that configuration
        WidgetConfig defaultWidgetConfig = defaultConfig.stream()
                .filter(widgetConfig -> widgetConfig.getType() == widgetType)
                .findFirst().orElseThrow();
        CustomWidget widget = createWidget(defaultWidgetConfig);

        dashboard.add(widget);
    }

    private void restoreDefault() {
        // To restore defaults, we just apply the default configuration
        applyConfiguration(defaultConfig);
    }
    // end::snippet[]

    private Div createWidgetContent() {
        Div content = new Div();
        content.setClassName("dashboard-widget-content");
        return content;
    }

    public static class Exporter extends DemoExporter<DashboardEditable> { // hidden-source-line
    } // hidden-source-line
}
