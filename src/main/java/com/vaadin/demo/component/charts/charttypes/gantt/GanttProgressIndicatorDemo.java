package com.vaadin.demo.component.charts.charttypes.gantt;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.charts.Chart;
import com.vaadin.flow.component.charts.model.*;
import com.vaadin.flow.component.charts.model.style.SolidColor;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;

import java.time.Instant;

@Route("chart-gantt-progress-indication")
public class GanttProgressIndicatorDemo extends Div {

    public GanttProgressIndicatorDemo() {
        Chart chart = new Chart(ChartType.GANTT);

        final Configuration configuration = chart.getConfiguration();

        configuration.setTitle("Gantt Chart with Progress Indicators");

        XAxis xAxis = configuration.getxAxis();
        xAxis.setMin(Instant.parse("2014-10-17T00:00:00Z"));
        xAxis.setMax(Instant.parse("2014-10-30T00:00:00Z"));

        PlotOptionsGantt plotOptionsGantt = new PlotOptionsGantt();
        configuration.setPlotOptions(plotOptionsGantt);

        // tag::snippet[]
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

        add(chart);
    }

    public static class Exporter // hidden-source-line
            extends DemoExporter<GanttProgressIndicatorDemo> { // hidden-source-line
    } // hidden-source-line
}
