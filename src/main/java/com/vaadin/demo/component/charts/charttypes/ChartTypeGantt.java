package com.vaadin.demo.component.charts.charttypes;

import com.vaadin.demo.DemoExporter;
import com.vaadin.flow.component.charts.Chart;
import com.vaadin.flow.component.charts.model.*;
import com.vaadin.flow.component.charts.model.style.SolidColor;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.Route;

import javax.xml.parsers.SAXParser;
import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneOffset;

@Route("chart-type-gantt")
public class ChartTypeGantt extends Div {
    public ChartTypeGantt() {
        // tag::snippet[]

        add(new Span("Replace this text after next version of Vaadin Charts is released."));

        /*

        // Create a Gantt chart
        Chart chart = new Chart(ChartType.GANTT);
        chart.setMode(ChartMode.GANTT);

        // Modify the default configuration
        final Configuration configuration = chart.getConfiguration();
        configuration.setTitle("Gantt Chart with Progress Indicators");

        // Configure the axes - set timeline boundaries
        XAxis xAxis = configuration.getxAxis();
        xAxis.setMin(Instant.parse("2014-10-17T00:00:00Z"));
        xAxis.setMax(Instant.parse("2014-10-30T00:00:00Z"));
        PlotOptionsGantt plotOptionsGantt = new PlotOptionsGantt();
        configuration.setPlotOptions(plotOptionsGantt);

        // Add data
        GanttSeries series = new GanttSeries();
        series.setName("Project 1");
        final GanttSeriesItem startPrototype = new GanttSeriesItem(
                "Start prototype", Instant.parse("2014-10-18T00:00:00Z"),
                Instant.parse("2014-10-25T00:00:00Z"));
        startPrototype.setCompleted(0.25);
        series.add(startPrototype);

        series.add(new GanttSeriesItem("Test prototype",
                Instant.parse("2014-10-27T00:00:00Z"),
                Instant.parse("2014-10-29T00:00:00Z")));

        final GanttSeriesItem develop = new GanttSeriesItem("Develop",
                Instant.parse("2014-10-20T00:00:00Z"),
                Instant.parse("2014-10-25T00:00:00Z"));
        develop.setCompleted(new Completed(0.12, SolidColor.ORANGE));
        series.add(develop);

        series.add(new GanttSeriesItem("Run acceptance tests",
                Instant.parse("2014-10-23T00:00:00Z"),
                Instant.parse("2014-10-26T00:00:00Z")));
        configuration.addSeries(series);
        // end::snippet[]

        add(new VerticalLayout(chart));


         */
    }

    public static class Exporter extends DemoExporter<ChartTypeGantt> { // hidden-source-line
    } // hidden-source-line
}
