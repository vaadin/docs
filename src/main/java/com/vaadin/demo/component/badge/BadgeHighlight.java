package com.vaadin.demo.component.badge;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.demo.domain.DataService;
import com.vaadin.demo.domain.Report;
import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.icon.Icon;
import com.vaadin.flow.component.icon.VaadinIcon;
import com.vaadin.flow.data.renderer.LocalDateRenderer;
import com.vaadin.flow.router.Route;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

@Route("badge-highlight")
public class BadgeHighlight extends Div {

    public BadgeHighlight() {
        Grid<Report> grid = new Grid<>(Report.class, false);

        grid.addColumn(Report::getReport).setHeader("Report");
        grid.addColumn(
                new LocalDateRenderer<>(BadgeHighlight::getDueDate, "MMM d, YYYY"))
                .setHeader("Due date");
        grid.addColumn(Report::getAssignee).setHeader("Assignee");
        // tag::snippet1[]
        grid.addComponentColumn(report ->
                createStatusBadge(report.getStatus()))
                .setHeader("status");
        // end::snippet1[]

        List<Report> reports = DataService.getReports();
        grid.setItems(reports);

        add(grid);
    }

    // tag::snippet2[]
    private Span createStatusBadge(String status) {
        Icon icon;
        String theme;
        switch (status) {
            case "In progress":
                icon = createIcon(VaadinIcon.CLOCK);
                theme = "badge primary";
                break;
            case "Completed":
                icon = createIcon(VaadinIcon.CHECK);
                theme = "badge success primary";
                break;
            case "Cancelled":
                icon = createIcon(VaadinIcon.CLOSE_SMALL);
                theme = "badge error primary";
                break;
            default:
                icon = createIcon(VaadinIcon.HAND);
                theme = "badge contrast primary";
                break;
        }
        Span badge = new Span(icon, new Span(status));
        badge.getElement().getThemeList().add(theme);
        return badge;
    }

    private Icon createIcon(VaadinIcon vaadinIcon) {
        Icon icon = vaadinIcon.create();
        icon.getStyle().set("padding", "var(--lumo-space-xs");
        return icon;
    }
    // end::snippet2[]

    private static LocalDate getDueDate(Report report) {
        return report.getDue().toInstant().atZone(ZoneId.systemDefault())
                .toLocalDate();
    }
    public static class Exporter extends DemoExporter<BadgeHighlight> { // hidden-source-line
    } // hidden-source-line
}
