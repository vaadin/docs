package com.vaadin.demo.component.dashboard;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.dashboard.DashboardWidget;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.router.Route;

@Route("dashboard-widget-contents")
public class DashboardWidgetContents extends Div {

    public DashboardWidgetContents() {
        // tag::snippet[]
        DashboardWidget widget = new DashboardWidget("Widget title");
        widget.setContent(new Span("Widget content"));
        widget.setHeaderContent(new Span("Additional header content"));
        // end::snippet[]

        add(widget);
    }

    public static class Exporter extends DemoExporter<DashboardWidgetContents> { // hidden-source-line
    } // hidden-source-line
}
